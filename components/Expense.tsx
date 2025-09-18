// app/components/ExpenseItem.tsx
"use client";

import { useEffect, useState } from "react";
import { DeleteButton } from "./DeleteButton";

// 1. Import all the necessary Dialog components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import editAction, { deleteExpense } from "@/actions";

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

export default function ExpenseItem({ expense }: ExpenseItemProps) {
  // 2. We use state to control when the dialog is open or closed
  const [open, setOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(new Date(expense.date).toLocaleDateString());
  }, [expense.date]);
  const deleteAction = deleteExpense.bind(null, expense.id);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <li className="p-4 border rounded-lg flex justify-between items-center">
        {/* This is the default display view */}
        <div className=" sm:flex-row sm:gap-150 flex flex-col">
          <div>
            <p className="font-semibold">{expense.title || "No title"}</p>
            <p className="text-sm text-gray-500">{expense.category}</p>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
          <div className="flex  items-center gap-4">
            <p className="text-lg font-mono">${expense.amount.toFixed(2)}</p>

            {/* 3. The DialogTrigger is the button that opens the pop-up */}
            <DialogTrigger asChild>
              <button className="text-blue-500 hover:text-blue-700">
                Edit
              </button>
            </DialogTrigger>

            <form action={deleteAction}>
              <DeleteButton />
            </form>
          </div>
        </div>
      </li>

      {/* 4. This is the content of the pop-up dialog */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>
        <form
          // 5. When submitted, the action runs, then we close the dialog
          action={async (formData) => {
            await editAction(formData);
            setOpen(false);
          }}
          className="flex flex-col gap-4"
        >
          <input type="hidden" name="id" value={expense.id} />
          <div>
            <label htmlFor="title" className="text-sm">
              Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={expense.title || ""}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="amount" className="text-sm">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              step="0.01"
              defaultValue={expense.amount}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button type="button" className="p-2 rounded bg-gray-200">
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              className="p-2 rounded bg-green-500 text-white"
            >
              Save Changes
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
