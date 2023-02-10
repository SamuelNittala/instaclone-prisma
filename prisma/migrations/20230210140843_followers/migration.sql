/*
  Warnings:

  - Added the required column `media_file` to the `PostMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postion` to the `PostMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostMedia" ADD COLUMN     "media_file" TEXT NOT NULL,
ADD COLUMN     "postion" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Follow" (
    "following_user_id" TEXT NOT NULL,
    "followed_user_id" TEXT NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("followed_user_id","following_user_id")
);

-- CreateTable
CREATE TABLE "Filter" (
    "id" TEXT NOT NULL,
    "filter_name" TEXT NOT NULL,
    "filter_details" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "Filter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_following_user_id_fkey" FOREIGN KEY ("following_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followed_user_id_fkey" FOREIGN KEY ("followed_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Filter" ADD CONSTRAINT "Filter_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "PostMedia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
