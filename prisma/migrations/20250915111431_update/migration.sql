/*
  Warnings:

  - The `category` column on the `Expense` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."ExpenseCategory" AS ENUM ('Food', 'Transport', 'Housing', 'Bills', 'Entertainment', 'Other');

-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "category",
ADD COLUMN     "category" "public"."ExpenseCategory" NOT NULL DEFAULT 'Other';
