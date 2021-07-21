/*
  Warnings:

  - You are about to drop the column `categories` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `etag` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `industry_identifiers` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `info_link` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `page_count` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `publisher` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `books` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "books.etag_unique";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "categories",
DROP COLUMN "description",
DROP COLUMN "etag",
DROP COLUMN "industry_identifiers",
DROP COLUMN "info_link",
DROP COLUMN "language",
DROP COLUMN "page_count",
DROP COLUMN "publisher",
DROP COLUMN "subtitle";
