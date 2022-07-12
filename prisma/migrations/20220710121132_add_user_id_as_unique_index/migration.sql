/*
  Warnings:

  - A unique constraint covering the columns `[id,user_id]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Bookmark_id_user_id_key` ON `Bookmark`(`id`, `user_id`);
