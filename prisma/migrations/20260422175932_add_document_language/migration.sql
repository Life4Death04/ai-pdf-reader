-- CreateEnum
CREATE TYPE "ChunkStatus" AS ENUM ('PENDING', 'GENERATING_AUDIO', 'DONE', 'ERROR');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "DocumentStatus" ADD VALUE 'REWRITING';
ALTER TYPE "DocumentStatus" ADD VALUE 'GENERATING';
ALTER TYPE "DocumentStatus" ADD VALUE 'PARTIALLY_READY';

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "audioDuration" DOUBLE PRECISION,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "processedChunks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalChunks" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "text_chunks" ADD COLUMN     "audioDuration" DOUBLE PRECISION,
ADD COLUMN     "status" "ChunkStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "audio_chunks" (
    "id" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "s3Url" TEXT NOT NULL,
    "duration" DOUBLE PRECISION,
    "textHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "documentId" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,

    CONSTRAINT "audio_chunks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "audio_chunks_documentId_chunkIndex_idx" ON "audio_chunks"("documentId", "chunkIndex");

-- CreateIndex
CREATE UNIQUE INDEX "audio_chunks_documentId_chunkIndex_key" ON "audio_chunks"("documentId", "chunkIndex");

-- AddForeignKey
ALTER TABLE "audio_chunks" ADD CONSTRAINT "audio_chunks_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
