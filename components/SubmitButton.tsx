"use client";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-black text-white p-2 rounded disabled:bg-gray-400"
    >
      {pending ? "Saving..." : "Add Expense"}
    </button>
  );
}
