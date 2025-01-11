/*
  Warnings:

  - Made the column `ipAddress` on table `Log` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "action" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "userAgent" TEXT,
    "requestData" TEXT,
    "ipAddress" TEXT NOT NULL,
    "status" INTEGER,
    "responseData" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Log" ("action", "endpoint", "id", "ipAddress", "requestData", "responseData", "status", "timestamp", "userAgent", "userId") SELECT "action", "endpoint", "id", "ipAddress", "requestData", "responseData", "status", "timestamp", "userAgent", "userId" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
