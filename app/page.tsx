// import { getTodoListAction } from "@/actions/todo.actions";
import { getTodoListAction } from "@/actions/todo.actions";
import AddTodoForm from "@/components/AddTodoForm";
import TodosTable from "@/components/TodoTable";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const {userId} = await auth();
  const todos = await getTodoListAction({userId});
  return (
    <main className="container">
      <div className="mx-auto flex w-full lg:w-3/4 flex-col justify-center space-y-4 mt-10">
        <AddTodoForm userId={userId} />
        <TodosTable todos={todos} />
      </div>
     
    </main>
  );
}
