/*
  Warnings:

  - You are about to drop the column `url` on the `Photo` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Photo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url2" TEXT,
    "archiveId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Photo_archiveId_fkey" FOREIGN KEY ("archiveId") REFERENCES "Archive" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Photo_archiveId_fkey" FOREIGN KEY ("archiveId") REFERENCES "Archive" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Photo" ("archiveId", "createdAt", "id", "updatedAt", "url2") SELECT "archiveId", "createdAt", "id", "updatedAt", "url2" FROM "Photo";
DROP TABLE "Photo";
ALTER TABLE "new_Photo" RENAME TO "Photo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
