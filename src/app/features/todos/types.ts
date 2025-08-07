export type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type GetTodosResponse = {
  data: Todo[];
  success: boolean;
  count: number;
};
export type GetTodoResponse = {
  data: Todo;
  success: boolean;
}

export type CreateTodoData = {
  title: string;
  description?: string;
};

export type UpdateTodoData = {
  title?: string;
  description?: string;
  completed?: boolean;
};
