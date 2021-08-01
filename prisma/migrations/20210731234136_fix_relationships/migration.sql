/*
  Warnings:

  - You are about to drop the `BookmarkCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookmarkCategories" DROP CONSTRAINT "BookmarkCategories_bookmarkId_fkey";

-- DropForeignKey
ALTER TABLE "BookmarkCategories" DROP CONSTRAINT "BookmarkCategories_categoryId_fkey";

-- DropTable
DROP TABLE "BookmarkCategories";

-- CreateTable
CREATE TABLE "_BookmarkToCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookmarkToCategory_AB_unique" ON "_BookmarkToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_BookmarkToCategory_B_index" ON "_BookmarkToCategory"("B");

-- AddForeignKey
ALTER TABLE "_BookmarkToCategory" ADD FOREIGN KEY ("A") REFERENCES "Bookmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookmarkToCategory" ADD FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
