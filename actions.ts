"use server";
import { revalidatePath } from "next/cache";
import { auth } from "./auth";
import prisma from "./lib/prisma";
import { ExpenseCategory } from "./app/generated/prisma";

export async function addExpense(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    console.error("no authenticated  user found ");
    return;
  }
  const userId = session.user.id;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const amountString = formData.get("amount") as string;
  const dateString = formData.get("date") as string;
  const category = formData.get("category") as ExpenseCategory;
  const amount = parseFloat(amountString);
  try {
    await prisma.expense.create({
      data: {
        title,
        description,
        amount,
        date: new Date(dateString),
        category,
        userId,
      },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("error creating a expense ", error);
  }
}
// delete

export async function deleteExpense(id: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("you must signed in to delete an expense");
  }
  try {
    await prisma.expense.delete({
      where: {
        id: id,
        userId: userId,
      },
    });
    revalidatePath("/dashboard");
  } catch (err) {
    console.error("error deleting expense", err);
  }
}

// edit
export default async function editAction(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("user is not authenticated ");
  }
  
  const id = Number(formData.get("id"));
const title = formData.get("title") as string; // Keep form field as "title" but store as description
  const amount = Number(formData.get("amount"));
  
  try {
    await prisma.expense.update({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        title: title, // Update the correct field
        amount: amount,
      },
    });
    revalidatePath('/dashboard');
  } catch (err) {
    console.error("error updating", err);
  }
}