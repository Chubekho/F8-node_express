/*
  Warnings:

  - You are about to drop the column `createAt` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `deleteAt` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `deleteAt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `deleteAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `createAt`,
    DROP COLUMN `deleteAt`,
    DROP COLUMN `updateAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `posts` DROP COLUMN `createAt`,
    DROP COLUMN `deleteAt`,
    DROP COLUMN `updateAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `createAt`,
    DROP COLUMN `deleteAt`,
    DROP COLUMN `updateAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `firstName` VARCHAR(191) NULL,
    MODIFY `lastName` VARCHAR(191) NULL;
