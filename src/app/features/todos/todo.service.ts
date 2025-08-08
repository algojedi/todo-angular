import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '../../core/constants/api-endpoints';
import { GetTodoResponse, GetTodosResponse, Todo } from './types';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);

  getTodos() {
    return this.http.get<GetTodosResponse>(api.todos.list);
  }

  getTodo(id: string | number) {
    return this.http.get<GetTodoResponse>(api.todos.getById(id));
  }
  // create function for updating a todo
  updateTodo(id: number, todo: Todo) {
    return this.http.put<Todo>(api.todos.update(id), todo);
  }

  deleteTodo(id: number) {
    return this.http.delete(api.todos.delete(id));
  }
}
