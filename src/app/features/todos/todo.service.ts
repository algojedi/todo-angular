import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '../../core/constants/api-endpoints';
import { GetTodosResponse, Todo } from './types';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);

  getTodos() {
    return this.http.get<GetTodosResponse>(api.todos.list);
  }

  deleteTodo(id: number) {
    return this.http.delete(api.todos.delete(id));
  }
}
