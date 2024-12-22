/*
  Warnings:

  - Added the required column `url2` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Archive" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "operationId" INTEGER NOT NULL,
    "settingId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "date1" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date2" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Archive_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Archive_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Archive_settingId_fkey" FOREIGN KEY ("settingId") REFERENCES "Setting" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Archive" ("createdAt", "customerId", "date1", "date2", "id", "operationId", "settingId", "status", "updatedAt") SELECT "createdAt", "customerId", "date1", "date2", "id", "operationId", "settingId", "status", "updatedAt" FROM "Archive";
DROP TABLE "Archive";
ALTER TABLE "new_Archive" RENAME TO "Archive";
CREATE TABLE "new_Photo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "url2" TEXT NOT NULL,
    "archiveId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Photo_archiveId_fkey" FOREIGN KEY ("archiveId") REFERENCES "Archive" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Photo_archiveId_fkey" FOREIGN KEY ("archiveId") REFERENCES "Archive" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Photo" ("archiveId", "createdAt", "id", "updatedAt", "url") SELECT "archiveId", "createdAt", "id", "updatedAt", "url" FROM "Photo";
DROP TABLE "Photo";
ALTER TABLE "new_Photo" RENAME TO "Photo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
