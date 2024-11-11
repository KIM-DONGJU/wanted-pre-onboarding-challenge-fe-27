export type Priority = 'urgent' | 'normal' | 'low';
export type Sort = 'createdAt' | 'updatedAt' | 'priority';
export type Order = 'asc' | 'desc';

export interface Todo {
  title: string;
  content: string;
  id: string;
  createAt: string;
  updateAt: string;
  priority: Priority
}

interface TodoResponse {
  data: Todo;
}

export interface GetTodosRes {
  data: Todo[];
}

export interface GetTodosParams {
  sort?: Sort;
  order?: Order;
  priorityFilter?: Priority;
  keyword?: string;
  countOnly?: boolean;
}

export interface CreateTodoParams {
  title: string;
  content: string;
  priority: Priority;
}

export type CreateTodoRes = TodoResponse;

export interface UpdateTodoParams {
  id: string;
  title: string;
  content: string;
  priority: Priority;
}

export type UpdateTodoRes = TodoResponse

export interface DeleteTodoRes {
  data: null
}