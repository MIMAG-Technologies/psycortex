-- CreateTable
CREATE TABLE `Inquiries` (
    `timeframe` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `country` VARCHAR(100) NOT NULL,
    `state` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `contactNumber` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `message` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`timeframe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bookings` (
    `timeframe` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(100) NOT NULL,
    `contactNumber` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `problemType` VARCHAR(100) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`timeframe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
