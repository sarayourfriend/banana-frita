/*
  Warnings:

  - You are about to drop the column `authorinfo` on the `Version` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Version" DROP COLUMN "authorinfo",
ADD COLUMN     "authorInfo" TEXT;
