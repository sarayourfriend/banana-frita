-- CreateTable
CREATE TABLE "Bookmark" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "textContent" TEXT NOT NULL,
    "siteName" TEXT,
    "authorInfo" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark.url_unique" ON "Bookmark"("url");
