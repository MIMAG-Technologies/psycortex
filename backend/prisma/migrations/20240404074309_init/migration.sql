-- CreateTable
CREATE TABLE `Subscriptions` (
    `timeframe` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`timeframe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
