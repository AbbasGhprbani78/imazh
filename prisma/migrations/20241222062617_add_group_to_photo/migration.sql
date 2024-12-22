/*
  Warnings:

  - Added the required column `group` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Photo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "archiveId" INTEGER NOT NULL,
    "group" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Photo_archiveId_fkey" FOREIGN KEY ("archiveId") REFERENCES "Archive" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Photo" ("archiveId", "createdAt", "id", "updatedAt", "url") SELECT "archiveId", "createdAt", "id", "updatedAt", "url" FROM "Photo";
DROP TABLE "Photo";
ALTER TABLE "new_Photo" RENAME TO "Photo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
