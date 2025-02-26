-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Archive" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "operationId" INTEGER NOT NULL,
    "settingId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "date1" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date2" DATETIME,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Archive_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Archive_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Archive_settingId_fkey" FOREIGN KEY ("settingId") REFERENCES "Setting" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Archive" ("createdAt", "customerId", "date1", "date2", "id", "operationId", "settingId", "status", "updatedAt") SELECT "createdAt", "customerId", "date1", "date2", "id", "operationId", "settingId", "status", "updatedAt" FROM "Archive";
DROP TABLE "Archive";
ALTER TABLE "new_Archive" RENAME TO "Archive";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
