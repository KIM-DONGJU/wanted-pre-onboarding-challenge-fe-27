import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { CommonTextArea, CommonButton, CommonInput, queryClient } from "@/shared";

import { todosMutationKeys } from "../api/todos.mutationKeys";
import { updateTodo } from "../api/todos";
import { todosQueryKeys } from "../api/todos.queryKeys";
import { validateUpdateTodo } from "../lib/validate";
import type { GetTodosRes, Priority } from "../types/todoTypes";

interface UpdateTodoModalProps {
  id: string;
  title: string;
  content: string;
  priority: Priority;
  onClose: () => void;
}

export function UpdateTodoModal({
  id,
  content,
  priority,
  title,
  onClose,
}: UpdateTodoModalProps) {
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContents] = useState(content);
  const [newPriority, setNewPriority] = useState<Priority>(priority);

  const { mutate: onUpdateTodo } = useMutation({
    mutationKey: todosMutationKeys.updateTodo(),
    mutationFn: () => updateTodo({
      id,
      title: newTitle,
      content: newContent,
      priority: newPriority,
    }),
    onSuccess: () => {
      queryClient.setQueriesData<GetTodosRes>(
        { queryKey: todosQueryKeys.getTodos() },
        (oldData) => {
          if (!oldData) {
            return { data: [] };
          }
    
          const updatedTodos = oldData.data.map((todo) => {
            if (todo.id === id) {
              return { ...todo, title: newTitle, content: newContent, priority: newPriority }
            };

            return todo;
          })
    
          return { data: updatedTodos };
        }
      );
      alert('수정되었습니다.');
    },
    onError: () => {
      alert('수정에 실패하였습니다.');
    },
    onSettled: () => {
      onClose();
    }
  });

  const isDisabledUpdateButton = () => {
    const oldData = { title, content, priority };
    const newData = { title: newTitle, content: newContent, priority: newPriority };

    return !validateUpdateTodo(oldData, newData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-96">
        <h1 className="text-2xl font-bold">Add Todo</h1>
        <CommonInput
          className="mt-3"
          type="text"
          width="full"
          height="lg"
          placeholder="타이틀을 입력해주세요"
          value={newTitle}
          onChange={setNewTitle}
        />
        <CommonTextArea
          className="mt-3"
          value={newContent}
          placeholder="내용을 입력해주세요"
          onChange={setNewContents}
        />
        <div className="mt-3 flex items-center gap-x-3">
          <label className="flex items-center gap-x-1">
            <input
              type="radio"
              name="priority"
              value="urgent"
              checked={newPriority === "urgent"}
              onChange={() => setNewPriority("urgent")}
            />
            <span>Urgent</span>
          </label>
          <label className="flex items-center gap-x-1">
            <input
              type="radio"
              name="priority"
              value="normal"
              checked={newPriority === "normal"}
              onChange={() => setNewPriority("normal")}
            />
            <span>Normal</span>
          </label>
          <label className="flex items-center gap-x-1">
            <input
              type="radio"
              name="priority"
              value="low"
              checked={newPriority === "low"}
              onChange={() => setNewPriority("low")}
            />
            <span>Low</span>
          </label>
        </div>
        <div className="mt-4 flex justify-between">
          <CommonButton className="w-20" variant="secondary" onClick={onClose}>
            취소
          </CommonButton>
          <CommonButton
            className="w-20"
            onClick={() => onUpdateTodo()}
            disabled={isDisabledUpdateButton()}>
            수정
          </CommonButton>
        </div>
      </div>
    </div>
  );
}