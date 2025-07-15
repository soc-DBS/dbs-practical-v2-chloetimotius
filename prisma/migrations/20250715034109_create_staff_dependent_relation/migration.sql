/*
  Warnings:

  - The primary key for the `staff_dependent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `staff_no` on the `staff_dependent` table. All the data in the column will be lost.
  - Added the required column `staffNo` to the `staff_dependent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "staff_dependent" DROP CONSTRAINT "staff_dependent_pkey",
DROP COLUMN "staff_no",
ADD COLUMN     "staffNo" TEXT NOT NULL,
ADD CONSTRAINT "staff_dependent_pkey" PRIMARY KEY ("staffNo", "dependent_name");

-- AddForeignKey
ALTER TABLE "staff_dependent" ADD CONSTRAINT "staff_dependent_staff_no_fk" FOREIGN KEY ("staffNo") REFERENCES "staff"("staff_no") ON DELETE NO ACTION ON UPDATE NO ACTION;
