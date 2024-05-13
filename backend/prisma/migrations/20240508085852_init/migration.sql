/*
  Warnings:

  - You are about to drop the column `password` on the `Otps` table. All the data in the column will be lost.
  - Added the required column `otp` to the `Otps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Otps` DROP COLUMN `password`,
    ADD COLUMN `otp` VARCHAR(191) NOT NULL;
