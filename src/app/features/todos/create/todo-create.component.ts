import { Component } from '@angular/core';
import { Todo } from '../types';
import { TodoFormComponent } from '../../../shared/todo-form/todo-form.component';

@Component({
  selector: 'app-todo-create',
  standalone: true,
  imports: [TodoFormComponent],
  templateUrl : './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent {
  onSubmit(formValue: Partial<Todo>) {
    const todo: Todo = {
      ...formValue,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: crypto.randomUUID(),
    } as Todo;

    console.log('Creating todo:', todo);
    // Call API to create the todo
  }
}
