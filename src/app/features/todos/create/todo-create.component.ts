import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-todo-create',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.scss',
})
export class TodoCreateComponent {
  title = signal('');
  description = signal('');

  isValid = computed(
    () =>
      this.title().trim().length > 0 && this.description().trim().length > 0,
  );

  onSubmit() {
    const todo = {
      title: this.title(),
      description: this.description(),
    };

    console.log('Creating todo:', todo);
    // Call a service to persist it
  }
}
