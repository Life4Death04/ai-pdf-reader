-- CreateIndex
CREATE INDEX "documents_userId_createdAt_idx" ON "documents"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "documents_status_idx" ON "documents"("status");

-- CreateIndex
CREATE INDEX "documents_createdAt_idx" ON "documents"("createdAt");

-- CreateIndex
CREATE INDEX "playback_progress_userId_documentId_mode_idx" ON "playback_progress"("userId", "documentId", "mode");

-- CreateIndex
CREATE INDEX "playback_progress_updatedAt_idx" ON "playback_progress"("updatedAt");
