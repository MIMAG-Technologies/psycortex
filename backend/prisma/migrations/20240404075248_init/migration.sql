/*
  Warnings:

  - The primary key for the `Subscriptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `timeframe` on the `Subscriptions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Subscriptions` DROP PRIMARY KEY,
    DROP COLUMN `timeframe`,
    ADD PRIMARY KEY (`email`);
