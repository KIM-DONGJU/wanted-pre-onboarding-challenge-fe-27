import { TodoItem, type Todo } from "@/features/todo";

interface TodoListProps {
  todos: Todo[];
}

export function TodoList({
  todos,
}: TodoListProps) {
  return (
    <div className="flex flex-col gap-y-3">
      {
        todos.map((todo) => (
          <TodoItem todoItem={todo} key={todo.id} />
        ))
      }
    </div>
  );
}