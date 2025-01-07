-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "nationalcode" TEXT NOT NULL,
    "datereference" DATETIME NOT NULL,
    "birthday" DATETIME NOT NULL,
    "filenumber" TEXT NOT NULL,
    "gender" TEXT NOT NULL DEFAULT 'men',
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Customer" ("birthday", "createdAt", "datereference", "email", "filenumber", "fullname", "gender", "id", "nationalcode", "phonenumber", "updatedAt") SELECT "birthday", "createdAt", "datereference", "email", "filenumber", "fullname", "gender", "id", "nationalcode", "phonenumber", "updatedAt" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
CREATE UNIQUE INDEX "Customer_phonenumber_key" ON "Customer"("phonenumber");
CREATE UNIQUE INDEX "Customer_nationalcode_key" ON "Customer"("nationalcode");
CREATE UNIQUE INDEX "Customer_filenumber_key" ON "Customer"("filenumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
