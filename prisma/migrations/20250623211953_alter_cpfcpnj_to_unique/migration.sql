/*
  Warnings:

  - A unique constraint covering the columns `[cpfcnpj]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Plan_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_cpfcnpj_key" ON "User"("cpfcnpj");
