/*
  Warnings:

  - Added the required column `username` to the `Inquiry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inquiry` ADD COLUMN `seen` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;
