// Your getExpenses function and imports are okay
async function getExpenses(id: string) {
  const expenses = await prisma.expense.findMany({
    where: {
      userId: id,
    },
  });

  return expenses;
}

import { auth } from "@/auth";
import CreateExpenseForm from "@/components/CreateExpenseForm";
import Expense from "@/components/Expense";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function page() {

  const session = await auth();

  // This check correctly protects the route
  if (!session?.user?.id) {
    redirect("/");
  }

  // The fix: We can now safely call and 'await' the function
  const expenses = await getExpenses(session.user.id);
   
  console.log(expenses)
  return (
    <div>
      <CreateExpenseForm />
      <ul className="space-y-2">
        {expenses.map((expense) => (
          <Expense key={expense.id} expense={expense} />
        ))}
      </ul>
      {expenses.length === 0 && (
        <p>You have no expenses yet. Add one to get started!</p>
      )}
    </div>
  );
}
