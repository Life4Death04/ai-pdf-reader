/**
 * S3 Storage Utility - Upload and delete audio files in Amazon S3
 *
 * Handles all direct interaction with AWS S3 for audio storage.
 * Audio files are stored as WAV with key format: audio/{docId}/chunk-{index}.wav
 *
 * TODO: Add WAV → MP3 conversion before upload to reduce storage costs.
 * WAV at 22050Hz mono 16-bit is ~2.6MB/min. MP3 at 128kbps would be ~0.96MB/min.
 * When adding conversion, update ContentType to "audio/mpeg" and key extension to ".mp3".
 */

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { BadGatewayError } from "../errors/AppError";

// ─────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────

const AWS_REGION = process.env.AWS_REGION ?? "us-east-1";
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME ?? "";

/**
 * Lazy-initialized S3 client singleton.
 */
let s3Client: S3Client | null = null;

function getS3Client(): S3Client {
  if (!s3Client) {
    s3Client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
      },
    });
  }
  return s3Client;
}

/**
 * Constructs the public S3 URL for a given key.
 *
 * Requires the S3 bucket to be configured for public read access.
 * Bucket policy should allow s3:GetObject for all principals on the audio/* prefix.
 */
function buildPublicUrl(key: string): string {
  return `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
}

// ─────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────

export interface S3UploadResult {
  s3Key: string;
  s3Url: string;
}

/**
 * Uploads an audio buffer to S3.
 *
 * @param params.buffer - WAV audio data
 * @param params.documentId - Document ID for key structure
 * @param params.chunkIndex - Chunk index (0-based)
 * @returns S3 key and public URL
 */
export async function uploadAudioToS3(params: {
  buffer: Buffer;
  documentId: string;
  chunkIndex: number;
}): Promise<S3UploadResult> {
  const { buffer, documentId, chunkIndex } = params;
  const s3Key = `audio/${documentId}/chunk-${chunkIndex}.wav`;

  console.log(
    `[s3] Uploading ${(buffer.length / 1024).toFixed(1)}KB to ${s3Key}`
  );

  try {
    await getS3Client().send(
      new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: s3Key,
        Body: buffer,
        ContentType: "audio/wav",
      })
    );

    const s3Url = buildPublicUrl(s3Key);
    console.log(`[s3] Uploaded successfully: ${s3Key}`);

    return { s3Key, s3Url };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown S3 error";
    console.error(`[s3] Upload failed for ${s3Key}:`, message);
    throw new BadGatewayError(`S3 upload failed: ${message}`);
  }
}

/**
 * Deletes multiple audio objects from S3 in a single batch request.
 *
 * @param keys - Array of S3 object keys to delete
 * @returns Number of objects successfully deleted
 */
export async function deleteDocumentAudioFromS3(
  keys: string[]
): Promise<number> {
  if (keys.length === 0) return 0;

  console.log(`[s3] Deleting ${keys.length} audio files`);

  try {
    const result = await getS3Client().send(
      new DeleteObjectsCommand({
        Bucket: S3_BUCKET_NAME,
        Delete: {
          Objects: keys.map((Key) => ({ Key })),
          Quiet: true,
        },
      })
    );

    const errorCount = result.Errors?.length ?? 0;
    const deletedCount = keys.length - errorCount;

    if (errorCount > 0) {
      console.error(
        `[s3] Failed to delete ${errorCount} objects:`,
        result.Errors
      );
    }

    console.log(`[s3] Deleted ${deletedCount}/${keys.length} audio files`);
    return deletedCount;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown S3 error";
    console.error(`[s3] Batch delete failed:`, message);
    throw new BadGatewayError(`S3 delete failed: ${message}`);
  }
}
