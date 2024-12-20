/*
  Warnings:

  - A unique constraint covering the columns `[operation]` on the table `Operation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Operation_operation_key" ON "Operation"("operation");
