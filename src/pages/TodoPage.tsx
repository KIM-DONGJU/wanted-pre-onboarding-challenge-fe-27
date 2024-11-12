import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { TodoList } from "@/widgets/todoList";
import {
  getTodos,
  todosQueryKeys,
  CreateTodoModal,
  useTodoSearch,
} from "@/features/todo";
import type {
  Sort,
  Order,
  Priority,
} from "@/features/todo";
import {
  CommonButton,
  CommonInput,
  CommonListBox,
  CommonPageWrapper,
  ONE_MINUTE,
  type CommonOptionItem,
} from "@/shared";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@headlessui/react";

const sortItems: CommonOptionItem<Sort>[] = [
  { value: "createdAt", label: "생성일" },
  { value: "updatedAt", label: "수정일" },
  { value: "priority", label: "우선순위" },
]

const orderItems: CommonOptionItem<Order>[] = [
  { value: "asc", label: "오름차순" },
  { value: "desc", label: "내림차순" },
]

const priorityItems: CommonOptionItem<Priority>[] = [
  {
    value: "urgent",
    label: "긴급",
  },
  {
    value: "normal",
    label: "보통",
  },
  {
    value: "low",
    label: "낮음",
  },
]

export function TodoPage() {
  const {
    searchState,
    setSort,
    setOrder,
    setPriorityFilter,
    setKeyword,
  } = useTodoSearch();

  const [isVisibleCreateTodoModal, setIsVisibleCreateTodoModal] = useState(false);

  const [debouncedKeyword, setDebouncedKeyword] = useState(searchState.keyword);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(searchState.keyword);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchState.keyword]);

  const { data: todoList, isSuccess, refetch } = useQuery({
    queryKey: todosQueryKeys.getTodos({ ...searchState, keyword: debouncedKeyword }),
    queryFn: () => getTodos(searchState),
    staleTime: ONE_MINUTE,
    gcTime: ONE_MINUTE,
  });

  useEffect(() => {
    refetch();
  }, [refetch])

  return (
    <CommonPageWrapper>
      <h1 className="text-2xl font-bold">TODO LIST</h1>
      <div className="mt-3">
        <CommonInput
          value={searchState.keyword as string}
          onChange={setKeyword}
        />
        <div className="mt-4 flex flex-col gap-y-2">
          <p className="text-lg font-bold">
            정렬 및 순서지정
          </p>
          <div className="flex items-center gap-x-3">
            <CommonListBox
              className="flex-1"
              items={sortItems}
              value={searchState.sort ?? "" as Sort}
              defaultLabel="정렬 기준"
              onChange={setSort}
            />
            <CommonListBox
              className="flex-1"
              items={orderItems}
              value={searchState.order ?? "" as Order}
              defaultLabel="정렬 순서"
              onChange={setOrder}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <p className="text-lg font-bold">
            우선 순위 필터
          </p>
          <div className="flex items-center gap-x-3">
            <CommonListBox
              className="flex-1"
              items={priorityItems}
              value={searchState.priorityFilter ?? "" as Priority}
              defaultLabel="우선 순위 필터"
              onChange={setPriorityFilter}
            />
            <Button onClick={() => setPriorityFilter(undefined)}>
              <XCircleIcon className="size-8" />
            </Button>
          </div>
        </div>
      </div>
      <CommonButton
        className="mt-3"
        height="lg"
        onClick={() => setIsVisibleCreateTodoModal(true)}
      >
        Add Todo
      </CommonButton>
      <div className="mt-4 flex flex-col gap-y-3">
        {
          isSuccess && <TodoList todos={todoList.data} />
        }
      </div>
      {isVisibleCreateTodoModal && <CreateTodoModal onClose={() => setIsVisibleCreateTodoModal(false)}/>}
    </CommonPageWrapper>
  );
}