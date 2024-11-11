import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import {
  getTodos,
  todosQueryKeys,
  CreateTodoModal,
  TodoItem,
} from "@/features/todo";
import {
  CommonButton,
  CommonPageWrapper,
} from "@/shared";

export function TodoList() {
  const { data: todoList, isSuccess } = useQuery({
    queryKey: todosQueryKeys.getTodos({}),
    queryFn: () => getTodos({}),
  });

  const [isVisibleCreateTodoModal, setIsVisibleCreateTodoModal] = useState(false);

  return (
    <CommonPageWrapper>
      <h1 className="text-2xl font-bold">TODO LIST</h1>
      <CommonButton
        className="mt-3"
        height="lg"
        onClick={() => setIsVisibleCreateTodoModal(true)}
      >
        Add Todo
      </CommonButton>
      <div className="mt-4 flex flex-col gap-y-3">
        {
           isSuccess && todoList.data.map((todo) => (
            <TodoItem todoItem={todo} key={todo.id} />
          ))
        }
      </div>
      {isVisibleCreateTodoModal && <CreateTodoModal onClose={() => setIsVisibleCreateTodoModal(false)}/>}
    </CommonPageWrapper>
  );
}