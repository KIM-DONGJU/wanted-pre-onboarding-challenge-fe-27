import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState, type MouseEvent, } from "react";

import { CommonButton, queryClient } from "@/shared";

import { UpdateTodoModal } from "./UpdateTodoModal";
import { todosMutationKeys } from "../api/todos.mutationKeys";
import { deleteTodo } from "../api/todos";
import { todosQueryKeys } from "../api/todos.queryKeys";
import type { GetTodosRes, Todo } from "../types/todoTypes";

interface TodoItemProps {
  todoItem: Todo;
}

export function TodoItem({
  todoItem
}: TodoItemProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const isOpenTodoContent = searchParams.get("id") === todoItem.id;
  const handleSetSearchParams = (id: string) => {
    if (isOpenTodoContent) {
      setSearchParams();
      return;
    };

    setSearchParams({id});
  }

  const { mutate: onDeleteTodo } = useMutation({
    mutationKey: todosMutationKeys.deleteTodo(),
    mutationFn: () => deleteTodo(todoItem.id),
    onSuccess: () => {
      queryClient.setQueriesData<GetTodosRes>({
        queryKey: todosQueryKeys.getTodos(),
      }, (oldData) => {
        if (!oldData) {
          return { data: []};
        };

        return {
          data: oldData.data.filter((todo) => todo.id !== todoItem.id)
        };
      })
      alert('할일이 삭제되었습니다.');
    },
    onError: () => {
      alert('할일 삭제에 실패했습니다.');
    }
  });

  const handleDeleteTodo = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDeleteTodo();
  };

  const [isVisibleUpdateTodoModal, setIsVisibleUpdateTodoModal] = useState(false);
  const handleOpenUpdateTodoModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsVisibleUpdateTodoModal(true);
  }

  return (
    <>
      <div className="rounded-lg bg-slate-600 flex flex-col p-4 cursor-pointer" onClick={() => handleSetSearchParams(todoItem.id)}>
        <div className="flex justify-between items-center">
          <p className="text-slate-200">
            {todoItem.title}
          </p>
          <div className="flex items-center gap-x-3">
            <CommonButton onClick={handleOpenUpdateTodoModal}>
              <span className="text-sm">수정</span>
            </CommonButton>
            <CommonButton onClick={handleDeleteTodo} variant="danger">
              <span className="text-sm">삭제</span>
            </CommonButton>
          </div>
        </div>
        {
          isOpenTodoContent && (
            <p className="text-sm text-slate-300 whitespace-pre">
              {todoItem.content}
            </p>
          )
        }
      </div>
        {
          isVisibleUpdateTodoModal && (
            <UpdateTodoModal
              content={todoItem.content}
              id={todoItem.id}
              priority={todoItem.priority}
              title={todoItem.title}
              onClose={() => setIsVisibleUpdateTodoModal(false)}
            />
          )
        }
    </>
  )
}