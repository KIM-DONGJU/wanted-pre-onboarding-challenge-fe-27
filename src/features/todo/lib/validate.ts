
import { CreateTodoParams } from './../types/todoTypes';

export const validateCreateTodo = ({
  content,
  priority,
  title
}: CreateTodoParams) => {
  return title.trim() !== "" && content.trim() !== "" && priority.trim() !== "";
}


export const validateUpdateTodo = (oldDate: CreateTodoParams, newData: CreateTodoParams) => {
  if (!validateCreateTodo(newData)) {
    return false;
  }
  if (
    oldDate.content === newData.content &&
    oldDate.priority === newData.priority &&
    oldDate.title === newData.title
  ) {
    return false;
  };

  return true;
}