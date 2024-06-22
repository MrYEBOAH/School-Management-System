-- CreateEnum
CREATE TYPE "User" AS ENUM ('ADMIN', 'STUDENT');

-- CreateTable
CREATE TABLE "ADMIN" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone_number" INTEGER NOT NULL,
    "admin_Id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "delflag" BOOLEAN NOT NULL DEFAULT false,
    "user" "User" NOT NULL,

    CONSTRAINT "ADMIN_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "STUDENT" (
    "id" TEXT NOT NULL,
    "index_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "delflag" BOOLEAN NOT NULL DEFAULT false,
    "user" "User" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "STUDENT_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ADMIN_email_key" ON "ADMIN"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ADMIN_admin_Id_key" ON "ADMIN"("admin_Id");

-- CreateIndex
CREATE UNIQUE INDEX "STUDENT_index_number_key" ON "STUDENT"("index_number");
