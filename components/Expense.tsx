import React from "react";

import type { Expense } from "@/app/generated/prisma";

type ExpensetypeProps = {
  expense: Expense;
};
const Expense = ({ expense }: ExpensetypeProps) => {
  const amount = expense.amount.toNumber();
  return (
    <div>
      <li className="p-4 border rounded-lg flex justify-between items-center">
        <div>
          <p className="font-semibold">
            {expense.description || "No description"}
          </p>
          <p className="text-sm text-gray-500">{expense.category}</p>
          <p className="text-sm text-gray-500">
            {new Date(expense.date).toLocaleDateString()}
          </p>
        </div>
        <p className="text-lg font-mono">${amount.toFixed(2)}</p>
      </li>
    </div>
  );
};

export default Expense;
