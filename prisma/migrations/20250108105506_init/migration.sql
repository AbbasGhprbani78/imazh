-- CreateTable
CREATE TABLE "SettingVideo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resolution" TEXT NOT NULL,
    "videoDelay" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
