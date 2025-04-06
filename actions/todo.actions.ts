"use server";

import { ITodo } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getTodoListAction = async ({ userId }: { userId: string | null }) => {
   return await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
   });
};

export const createTodoAction = async ({
  title,
  body,
  completed,
  userId
}: {
  title: string;
  body?: string | undefined;
  completed: boolean,
  userId: string | null
}) => {
  await prisma.todo.create({
    data: {
      title,
      body,
      completed,
      user_id:  userId as string
    },
  });
  revalidatePath("/");
};

export const deleteTodoAction = async ({ id }: { id: string }) => {
  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) {
    throw new Error("Todo not found. Cannot delete.");
  }

  await prisma.todo.delete({
    where: { id },
  });
  revalidatePath("/")
  return { success: true };
};

export const updateTodoAction = async ({ id, title, body, completed }: ITodo): Promise<void> => {
  try {
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
        body,
        completed,
      },
    });

    revalidatePath("/");
  } catch (error) {
    throw new Error("Something went wrong");
  }
};