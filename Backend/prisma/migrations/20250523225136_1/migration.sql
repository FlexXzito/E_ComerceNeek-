-- CreateTable
CREATE TABLE `User` (
    `id_User` VARCHAR(191) NOT NULL,
    `Username` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Acepto` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_Email_key`(`Email`),
    PRIMARY KEY (`id_User`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `caracteristicas` JSON NOT NULL,
    `Imagenes` JSON NOT NULL,
    `precio` DOUBLE NOT NULL,
    `preciooferta` DOUBLE NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `busqueda` JSON NOT NULL,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
