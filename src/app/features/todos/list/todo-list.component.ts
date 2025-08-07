import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../types';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  imports: [ RouterLink, MatListModule ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  private readonly todoService = inject(TodoService);
  todos: Todo[] = []; // Prefer typing over 'any'

  ngOnInit(): void {
    this.loadTodos();
  }

  private loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        console.log('Todos:', todos);
        this.todos = todos.data;
      },
      error: (error) => {
        console.error('Error fetching todos:', error);
        // Optional: user-facing feedback
      },
    });
  }
}
