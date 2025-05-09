-- CreateTable
CREATE TABLE `User` (
    `id_User` VARCHAR(191) NOT NULL,
    `Username` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Acepto` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_id_User_key`(`id_User`),
    UNIQUE INDEX `User_Email_key`(`Email`),
    PRIMARY KEY (`id_User`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
