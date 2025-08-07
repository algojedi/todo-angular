import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from '../types';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-create',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.scss',
})
export class TodoCreateComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(5)]],
  });

  ngOnInit() {
    this.form.statusChanges.subscribe(() => {
      for (const controlName in this.form.controls) {
        const control = this.form.get(controlName);
        console.log({ walue: control?.value });
        console.log({ isValid: this.form.valid });
        if (control?.invalid) {
          console.log(`Control "${controlName}" errors:`, control.errors);
        }
      }
    });
  }

  onSubmit() {
    const { title, description } = this.form.value;
    const todo: Todo = {
      title: title!,
      description: description!,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: crypto.randomUUID(), // Generate a unique ID for the new todo
    };

    console.log('Creating todo:', todo);
    // save on session storage as key of todo
    localStorage.setItem('test', 'I hope this works');
    sessionStorage.setItem(todo.title, JSON.stringify(todo));
  }
}
