import { auth } from "@/auth";
import CategoryChart from "@/components/CategoryChart";
import CreateExpenseForm from "@/components/CreateExpenseForm";
import Expense from "@/components/Expense";
import FilterControls from "@/components/FilterControls";
import {
  getCategoryTotal,
  getDateRange,
  getExpenses,
  getMonthlyTotal,
} from "@/components/query";
import { redirect } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams?: { period?: string };
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }
  const period = searchParams?.period || "month";
  const dateFilter = getDateRange(period);

  const expenses = await getExpenses(session.user.id, dateFilter);
  const monthlyTotal = await getMonthlyTotal(session.user.id, dateFilter);
  const categoryTotal = await getCategoryTotal(session.user.id, dateFilter);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome, {session.user.name}!</h1>

      <CreateExpenseForm />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Spending by Category</h2>
        <CategoryChart data={categoryTotal} />
      </div>
      <p className="text-4xl font-bold">${monthlyTotal.toFixed(2)}</p>
      <FilterControls />
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
