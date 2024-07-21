-- CreateTable
CREATE TABLE `Transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `productIds` VARCHAR(191) NOT NULL,
    `amount` VARCHAR(50) NOT NULL,
    `transactionIdentifier` VARCHAR(100) NOT NULL,
    `transactionState` VARCHAR(50) NOT NULL,
    `errorMessage` VARCHAR(255) NULL,
    `dateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
