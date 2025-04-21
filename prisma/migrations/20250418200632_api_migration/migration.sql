-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpfcnpj" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "planId" UUID NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professional" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "cpfcnpj" TEXT,
    "bussinesId" UUID NOT NULL,
    "isRegistered" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Professional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" UUID NOT NULL,
    "status" TEXT NOT NULL,
    "dateTime" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expedient" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "expedientInfos" TEXT NOT NULL,

    CONSTRAINT "Expedient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blocking" (
    "id" UUID NOT NULL,
    "dateTimeStart" TEXT NOT NULL,
    "dateTimeEnd" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "allDay" BOOLEAN,
    "allProfessionals" BOOLEAN,

    CONSTRAINT "Blocking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" UUID NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "nameId" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "isPrivated" BOOLEAN NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isPrivated" BOOLEAN,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" UUID NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "isPrivated" BOOLEAN NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Benefit" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "bonusPoint" INTEGER NOT NULL,

    CONSTRAINT "Benefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProfessionalToRole" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ProfessionalToRole_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_BenefitToPlan" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_BenefitToPlan_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Professional_id_key" ON "Professional"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Professional_bussinesId_key" ON "Professional"("bussinesId");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_id_key" ON "Appointment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Expedient_id_key" ON "Expedient"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Blocking_id_key" ON "Blocking"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Business_id_key" ON "Business"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Service_id_key" ON "Service"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_id_key" ON "Rating"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_id_key" ON "Plan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Benefit_id_key" ON "Benefit"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_id_key" ON "Role"("id");

-- CreateIndex
CREATE INDEX "_ProfessionalToRole_B_index" ON "_ProfessionalToRole"("B");

-- CreateIndex
CREATE INDEX "_BenefitToPlan_B_index" ON "_BenefitToPlan"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professional" ADD CONSTRAINT "Professional_bussinesId_fkey" FOREIGN KEY ("bussinesId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessionalToRole" ADD CONSTRAINT "_ProfessionalToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Professional"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessionalToRole" ADD CONSTRAINT "_ProfessionalToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BenefitToPlan" ADD CONSTRAINT "_BenefitToPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Benefit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BenefitToPlan" ADD CONSTRAINT "_BenefitToPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
