/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Poll` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[profile_name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_userId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "profile_name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Poll";

-- DropEnum
DROP TYPE "VOTING_TYPE";

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostMedia" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "PostMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_profile_name_key" ON "User"("profile_name");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostMedia" ADD CONSTRAINT "PostMedia_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
