"use server";
import { revalidatePath } from "next/cache";
import { auth } from "./auth";
import prisma from "./lib/prisma";

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
  const category = formData.get("category") as string;
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
    revalidatePath("/dashboard")
  } catch (error) {
    console.error("error creating a expense ", error);
  }
}

