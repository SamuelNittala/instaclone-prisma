-- CreateEnum
CREATE TYPE "VOTING_TYPE" AS ENUM ('MULTIPLE_ANSWERS', 'IMAGES', 'CALENDAR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(255) NOT NULL,
    "votingType" "VOTING_TYPE" NOT NULL DEFAULT 'MULTIPLE_ANSWERS',
    "userId" TEXT NOT NULL,
    "answers" TEXT[],

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Poll_title_key" ON "Poll"("title");

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
