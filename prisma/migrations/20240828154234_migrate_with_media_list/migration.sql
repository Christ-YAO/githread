-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "mediaList" TEXT[],
ALTER COLUMN "media" DROP NOT NULL,
ALTER COLUMN "media" SET DATA TYPE TEXT;
