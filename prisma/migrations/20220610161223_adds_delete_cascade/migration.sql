-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
