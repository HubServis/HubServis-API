/*
  Warnings:

  - You are about to drop the column `bussinesId` on the `Professional` table. All the data in the column will be lost.
  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cpfcnpj]` on the table `Professional` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[businessId]` on the table `Professional` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `businessId` to the `Professional` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Professional` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cpfcnpj` on table `Professional` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Professional" DROP CONSTRAINT "Professional_bussinesId_fkey";

-- DropIndex
DROP INDEX "Professional_bussinesId_key";

-- AlterTable
ALTER TABLE "Professional" DROP COLUMN "bussinesId",
ADD COLUMN     "businessId" UUID NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "cpfcnpj" SET NOT NULL;

-- DropTable
DROP TABLE "Appointment";

-- CreateTable
CREATE TABLE "Schedule" (
    "id" UUID NOT NULL,
    "status" TEXT NOT NULL,
    "dateTime" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_id_key" ON "Schedule"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Professional_cpfcnpj_key" ON "Professional"("cpfcnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Professional_businessId_key" ON "Professional"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Professional" ADD CONSTRAINT "Professional_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
