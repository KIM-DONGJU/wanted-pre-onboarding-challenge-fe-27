import { axiosInstance } from "@/shared";

import type {
  CreateTodoParams,
  CreateTodoRes,
  DeleteTodoRes,
  GetTodosParams,
  GetTodosRes,
  UpdateTodoParams,
  UpdateTodoRes
} from "../types/todoTypes";

export const getTodos = async ({
  countOnly,
  keyword,
  order,
  priorityFilter,
  sort
}: GetTodosParams) => {
  const { data } = await axiosInstance.get<GetTodosRes>('/todos', {
    params: {
      countOnly,
      keyword,
      order,
      priorityFilter,
      sort
    }
  });

  return data;
};

export const createTodo = async ({
  content,
  priority,
  title
}: CreateTodoParams) => {
  const { data } = await axiosInstance.post<CreateTodoRes>('/todos', {
    content,
    priority,
    title
  });

  return data;
};

export const updateTodo = async ({
  content,
  id,
  priority,
  title
}: UpdateTodoParams) => {
  const { data } = await axiosInstance.put<UpdateTodoRes>(`/todos/${id}`, {
    content,
    priority,
    title
  });

  return data;
};

export const deleteTodo = async (id: string) => {
  const { data } = await axiosInstance.delete<DeleteTodoRes>(`/todos/${id}`)

  return data;
}