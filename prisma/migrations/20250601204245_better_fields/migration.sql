/*
  Warnings:

  - You are about to drop the column `age` on the `Member` table. All the data in the column will be lost.
  - Added the required column `birthday` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `chapter` on the `Member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `lead_role` on the `Member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `university_cycle` on the `Member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LeadChapter" AS ENUM ('TECSUP', 'UTEC', 'UPN', 'VILLAREAL', 'UNI');

-- CreateEnum
CREATE TYPE "LeadRole" AS ENUM ('Presidente', 'Vicepresidente', 'Miembro');

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "age",
ADD COLUMN     "birthday" TEXT NOT NULL,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "skills" TEXT[],
DROP COLUMN "chapter",
ADD COLUMN     "chapter" "LeadChapter" NOT NULL,
DROP COLUMN "lead_role",
ADD COLUMN     "lead_role" "LeadRole" NOT NULL,
DROP COLUMN "university_cycle",
ADD COLUMN     "university_cycle" INTEGER NOT NULL;
