-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SettingVideo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "resolution" TEXT NOT NULL,
    "videoDelay" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_SettingVideo" ("createdAt", "format", "id", "resolution", "updatedAt", "videoDelay") SELECT "createdAt", "format", "id", "resolution", "updatedAt", "videoDelay" FROM "SettingVideo";
DROP TABLE "SettingVideo";
ALTER TABLE "new_SettingVideo" RENAME TO "SettingVideo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
