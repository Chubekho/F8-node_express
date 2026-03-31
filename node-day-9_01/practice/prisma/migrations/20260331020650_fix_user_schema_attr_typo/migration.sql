/*
  Warnings:

  - You are about to drop the column `userame` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `users_userame_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `userame`,
    ADD COLUMN `username` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);
