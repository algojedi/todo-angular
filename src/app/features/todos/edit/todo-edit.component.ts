import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Todo } from '../types';
import { TodoService } from '../todo.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-todo-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink
  ],
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
  private previousTodo = signal<Todo | null>(null);
  private readonly todoService = inject(TodoService);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(5)]],
  });

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

  onSubmit() {
    const { title, description } = this.form.value;
    const todo: Todo = {
      title: title!,
      description: description!,
      completed: false,
      createdAt: this.previousTodo()!.createdAt, 
      updatedAt: new Date(),
      id: this.previousTodo()!.id 
    };

    this.todoService.updateTodo(+todo.id, todo).subscribe({
      next: (response) => {
        console.log('Todo updated successfully:', response);
        this.router.navigate(['/todos']);
      },
      error: (error) => {
        console.error('Error updating todo:', error);
      },
    });

    console.log('Creating todo:', todo);
    // save on session storage as key of todo
    localStorage.setItem('test', 'I hope this works');
    sessionStorage.setItem(todo.title, JSON.stringify(todo));
  }

}
