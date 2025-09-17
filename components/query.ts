export const runtime = "nodejs";

import prisma from "@/lib/prisma";
export const getDateRange = (period: string) => {
  const today = new Date();
  let gte; // "greater than or equal to" date

  if (period === "week") {
    gte = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  } else if (period === "month") {
    gte = new Date(today.getFullYear(), today.getMonth(), 1);
  } else {
    return {}; // Return empty object for no date filter
  }
  return { gte };
};

export async function getExpenses(userId: string, dateFilter: any) {
  const expenses = await prisma.expense.findMany({
    where: {
      userId: userId,
      date: dateFilter,
    },
  });

  return expenses;
}

export async function getCategoryTotal(userId: string, dateFilter: any) {
  const categoryTotal = await prisma.expense.groupBy({
    by: ["category"],
    where: {
      userId: userId,
      date: dateFilter,
    },
    _sum: {
      amount: true,
    },
  });
  const formatedTotal = categoryTotal.map((item) => ({
    name: item.category,
    total: item._sum.amount?.toNumber() ?? 0,
  }));
  return formatedTotal;
}

export async function getMonthlyTotal(userId: string, dateFilter: any) {
  const result = await prisma.expense.aggregate({
    where: {
      userId: userId,
      date: dateFilter,
    },
    _sum: {
      amount: true,
    },
  });
  return result._sum.amount ?? 0;
}
