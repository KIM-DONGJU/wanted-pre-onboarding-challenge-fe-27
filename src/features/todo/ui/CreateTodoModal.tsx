import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import {
  CommonButton,
  CommonInput,
  CommonRadioGroup,
  CommonTextArea,
  queryClient
} from "@/shared";

import { todosMutationKeys } from "../api/todos.mutationKeys";
import { createTodo,  } from "../api/todos";
import { todosQueryKeys } from "../api/todos.queryKeys";
import { validateCreateTodo } from "../lib/validate";
import type { Priority } from "../types/todoTypes";

interface PriorityRadioItem {
  value: Priority;
  label: string;
}

const priorityRadioItems: PriorityRadioItem[] = [
  { value: "urgent", label: "Urgent" },
  { value: "normal", label: "Normal" },
  { value: "low", label: "Low" },
];

interface CreateTodoModalProps {
  onClose: () => void;
}

export function CreateTodoModal({ onClose }: CreateTodoModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContents] = useState("");
  const [priority, setPriority] = useState<Priority>("normal");

  const { mutate: onCreateTodo } = useMutation({
    mutationKey: todosMutationKeys.createTodo(),
    mutationFn: () => createTodo({
      title,
      content,
      priority,
    }),
    onSuccess: () => {
      // 검색 등에 의해 다양한 필터가 있을 수 있어 active 상태인 쿼리 갱신
      queryClient.invalidateQueries({
        queryKey: todosQueryKeys.getTodos(),
      });
      alert('할일이 추가되었습니다.');
    },
    onError: () => {
      alert('할일 추가에 실패했습니다.');
    },
    onSettled: () => {
      onClose();
    }
  });

  const isDisabledCreateButton = () => {
    return !validateCreateTodo({ title, content, priority });
  }

  const handleCreateTodo = () => {
    onCreateTodo();
  }

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
          value={title}
          onChange={setTitle}
        />
        <CommonTextArea
          className="mt-3"
          value={content}
          placeholder="내용을 입력해주세요"
          onChange={setContents}
        />
        <CommonRadioGroup
          items={priorityRadioItems}
          value={priority}
          onChange={setPriority}
        />
        <div className="mt-4 flex justify-between">
          <CommonButton className="w-20" variant="secondary" onClick={onClose}>
            취소
          </CommonButton>
          <CommonButton className="w-20" onClick={handleCreateTodo} disabled={isDisabledCreateButton()}>
            추가
          </CommonButton>
        </div>
      </div>
    </div>
  );
}