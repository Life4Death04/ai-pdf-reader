-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "errorCode" TEXT,
ADD COLUMN     "errorMessage" TEXT,
ADD COLUMN     "failedAt" TIMESTAMP(3);
