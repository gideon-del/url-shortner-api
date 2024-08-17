/*
  Warnings:

  - A unique constraint covering the columns `[shortId]` on the table `URL` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortId` to the `URL` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "URL_shortUrl_idx";

-- AlterTable
ALTER TABLE "URL" ADD COLUMN     "shortId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "URL_shortId_key" ON "URL"("shortId");

-- CreateIndex
CREATE INDEX "URL_shortId_idx" ON "URL"("shortId");
