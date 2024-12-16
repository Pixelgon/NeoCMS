/*
  Warnings:

  - Made the column `body` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `background` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `photo` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "body" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "background" SET NOT NULL,
ALTER COLUMN "photo" SET NOT NULL;
