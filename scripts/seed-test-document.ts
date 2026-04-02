/**
 * Test script: Creates a sample document with chunks in the database
 * Run with: npx tsx scripts/seed-test-document.ts
 */

import { prisma } from "../lib/prisma/prisma";
import { DocumentStatus, ProcessingMode } from "../types";

async function seedTestDocument() {
  console.log("[seed] Creating test document...");

  // Get or create default user
  const email = process.env.DEFAULT_USER_EMAIL ?? "default@localhost";
  let user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    user = await prisma.user.create({ data: { email } });
    console.log(`[seed] Created user: ${email}`);
  }

  // Create test document
  const document = await prisma.document.create({
    data: {
      title: "Test Document - Streaming Demo",
      fileName: "test-streaming.pdf",
      fileUrl: "/tmp/test.pdf",
      fileSize: 1024,
      pageCount: 1,
      extractedText: "Full document text...",
      status: DocumentStatus.READY,
      userId: user.id,
    },
  });

  console.log(`[seed] Created document: ${document.id}`);

  // Create sample chunks
  const chunkTexts = [
    "Welcome to the AI PDF Reader. This is the first chunk of our test document.",
    "In this second chunk, we explore the streaming capabilities of our system. Audio is generated progressively.",
    "The third chunk demonstrates caching. If you play this document again, it will load instantly from cache.",
    "Finally, the fourth chunk shows error handling. Our system retries failed chunks automatically.",
  ];

  for (let i = 0; i < chunkTexts.length; i++) {
    await prisma.textChunk.create({
      data: {
        documentId: document.id,
        index: i,
        text: chunkTexts[i],
        tokenCount: Math.ceil(chunkTexts[i].length / 4),
        mode: ProcessingMode.FULL_TEXT,
      },
    });
  }

  console.log(`[seed] Created ${chunkTexts.length} chunks`);
  console.log(`\n✅ Test document ready!`);
  console.log(`\nTo test streaming:`);
  console.log(`  curl "http://localhost:3000/api/stream?documentId=${document.id}&mode=FULL_TEXT" --output /tmp/test-stream.wav`);
  console.log(`\nDocument ID: ${document.id}`);
  
  return document.id;
}

seedTestDocument()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("[seed] Error:", error);
    process.exit(1);
  });
