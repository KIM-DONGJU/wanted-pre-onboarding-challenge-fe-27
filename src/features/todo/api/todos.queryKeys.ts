import { GetTodosParams } from "../types/todoTypes";

export const todosQueryKeys = {
  getTodos: (params?: GetTodosParams) => {
    const queryKey: [string | GetTodosParams] = ['getTodos'];
    if (params) {
      queryKey.push(params);
    };

    return queryKey
  }
}