import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="p-4 md:p-8">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Welcome, {session.user.name}!</h1>
    </div>

    <FilterControls />

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Total Spending Card */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg text-gray-500">Total Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">${monthlyTotal.toFixed(2)}</p>
        </CardContent>
      </Card>

      {/* Category Chart Card */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryChart data={categoryTotal} />
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Add Expense Form Card */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateExpenseForm />
        </CardContent>
      </Card>

      {/* Expense List Card */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {expenses.map((expense:any) => {
              const plainExpense = {
                title : expense.title,
                id: expense.id,
                description: expense.description,
                amount: expense.amount.toNumber(),
                date: expense.date.toISOString(),
                category: expense.category,
                userId: expense.userId,
              };
              return <Expense key={expense.id} expense={plainExpense} />;
            })}
          </ul>
          {expenses.length === 0 && (
            <p>You have no expenses yet. Add one to get started!</p>
          )}
        </CardContent>
      </Card>
    </div>
  </div>
  );
}
