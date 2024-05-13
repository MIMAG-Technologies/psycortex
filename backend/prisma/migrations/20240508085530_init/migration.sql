/*
  Warnings:

  - You are about to drop the `OTPS` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `OTPS`;

-- CreateTable
CREATE TABLE `Otps` (
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `DateTime` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Otps_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
