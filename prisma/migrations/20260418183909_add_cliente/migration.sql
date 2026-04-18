-- AlterTable
ALTER TABLE `Usuario` MODIFY `rol` VARCHAR(191) NOT NULL DEFAULT 'CLIENTE';

-- CreateTable
CREATE TABLE `Favorito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `contenidoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Favorito_usuarioId_contenidoId_key`(`usuarioId`, `contenidoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Favorito` ADD CONSTRAINT `Favorito_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorito` ADD CONSTRAINT `Favorito_contenidoId_fkey` FOREIGN KEY (`contenidoId`) REFERENCES `Contenido`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
