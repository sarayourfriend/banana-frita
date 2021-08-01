/*
  Warnings:

  - You are about to drop the column `authorInfo` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `siteName` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `textContent` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Bookmark` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "authorInfo",
DROP COLUMN "content",
DROP COLUMN "siteName",
DROP COLUMN "textContent",
DROP COLUMN "title";

-- CreateTable
CREATE TABLE "Version" (
    "id" SERIAL NOT NULL,
    "bookmarkId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "textContent" TEXT NOT NULL,
    "siteName" TEXT,
    "authorinfo" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Version" ADD FOREIGN KEY ("bookmarkId") REFERENCES "Bookmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;
