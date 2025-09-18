"use client";
import React, { useState } from "react";

import type { Expense } from "@/app/generated/prisma";
import editAction, { deleteExpense } from "@/actions";
import { DeleteButton } from "./DeleteButton";

type PlainExpense = {
  id: number;
  title: string | null;
  description: string | null;
  amount: number;
  date: string;
  category: string;
  userId: string;
};

type ExpenseItemProps = {
  expense: PlainExpense;
};  

const Expense = ({ expense }: ExpenseItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const deleteAction = deleteExpense.bind(null, expense.id);

  const handleSubmit = async (formData: FormData) => {
    await editAction(formData);
    setIsEditing(false); // Close edit mode after successful submission
  };

  return (
    <div>
      <li className="p-4 border rounded-lg flex justify-between items-center">
        {isEditing ? (
          // Edit mode - show form inputs
          <form
            action={handleSubmit}
            className="flex-1 flex justify-between items-center"
          >
            <div className="flex-1 ">
              <input type="hidden" name="id" value={expense.id} />
              <input
                type="text"
                name="title"
                defaultValue={expense.title || ""}
                className="font-semibold border rounded px-2 py-1 mb-2 w-20 sm:w-full"
                placeholder="Title"
              />
              <p className="text-sm text-gray-500">{expense.category}</p>
              <p className="text-sm text-gray-500">
                {new Date(expense.date).toLocaleDateString()}
              </p>
            </div>
            <div className="mx-4 flex-1">
              <input
                type="number"
                name="amount"
                defaultValue={expense.amount}
                step="0.01"
                className="text-lg font-mono border rounded px-2 mb-12 w-9 sm:w-24"
              />
            </div>
            <div className=" relative  ">
              <div className=" flex gap-2 absolute left-[-112px]">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          // View mode - show expense details
          <>
            <div className="flex flex-col">
              <div>
                <p className="font-semibold">{expense.title || "No title"}</p>
                <p className="text-sm text-gray-500">{expense.category}</p>
                <p className="text-sm text-gray-500">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-lg font-mono">
                  ${expense.amount.toFixed(2)}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <form action={deleteAction}>
                    <DeleteButton />
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </li>
    </div>
  );
};

export default Expense;
