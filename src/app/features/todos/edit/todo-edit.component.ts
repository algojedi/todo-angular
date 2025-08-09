import { Component, inject, signal } from '@angular/core';
import { Todo } from '../types';
import { TodoFormComponent } from '../../../shared/todo-form/todo-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-edit',
  standalone: true,
  imports: [TodoFormComponent],
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private id = signal(this.route.snapshot.paramMap.get('id'));
  private previousTodo = signal<Todo | null>(null);
  private readonly todoService = inject(TodoService);

  todo: Todo = {
    id: '123',
    title: 'Existing todo',
    description: 'Some description',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };

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
    this.todoService.getTodo(id).subscribe({
      next: (response) => {
        console.log('Todo:', response);
        this.previousTodo.set(response.data)
        console.log({ todo : this.previousTodo() });
        // populate the form with the todo data
        this.form.patchValue({
          title: this.previousTodo()!.title,
          description: this.previousTodo()!.description,
        });
        this.form.statusChanges.subscribe(() => {
          for (const controlName in this.form.controls) {
            const control = this.form.get(controlName);
            console.log({ value: control?.value });
            console.log({ isValid: this.form.valid });
            if (control?.invalid) {
              console.log(`Control "${controlName}" errors:`, control.errors);
            }
          }
        });
      },
      error: (error) => {
        console.error('Error fetching todos:', error);
        this.router.navigate(['/not-found']); // should be error page
      },
    });
  }

  onSubmit(updatedValue: Partial<Todo>) {
    const updatedTodo = { ...this.todo, ...updatedValue, updatedAt: new Date() };
    console.log('Updating todo:', updatedTodo);
    // Call API to update the todo
  }
}
