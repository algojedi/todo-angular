import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Todo } from '../types';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-edit.component.html',
  styleUrl: './todo-edit.component.scss',
  template: `
    <h1>Edit Todo #{{ id() }}</h1>
    <!-- You can reuse form like in Create -->
  `,
})
export class TodoEditComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private id = signal(this.route.snapshot.paramMap.get('id'));

  private readonly todoService = inject(TodoService);
  // private todo: Todo; // Prefer typing over 'any'

  ngOnInit(): void {
    this.loadTodo();
  }

  private loadTodo(): void {
    const id = this.id();
    if (!id) {
      // redirect to not-found
      this.router.navigate(['/not-found']);
      return;
    }
    let todo
    this.todoService.getTodo(id).subscribe({
      next: (response) => {
        console.log('Todo:', response);
        todo = response.data;
        console.log({ todo });
      },
      error: (error) => {
        console.error('Error fetching todos:', error);
        this.router.navigate(['/not-found']); // should be error page
      },
    });
  }
}
