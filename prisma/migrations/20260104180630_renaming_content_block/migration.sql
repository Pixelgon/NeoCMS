/*
  Warnings:

  - You are about to drop the `ContentBlock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ContentBlock";

-- CreateTable
CREATE TABLE "Block" (
    "id" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "createdOn" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);
