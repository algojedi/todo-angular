import { Routes } from '@angular/router';
import { TodoCreateComponent } from './features/todos/create/todo-create.component';
import { TodoEditComponent } from './features/todos/edit/todo-edit.component';
import { TodoListComponent } from './features/todos/list/todo-list.component';

export const routes: Routes = [
  {
    path: 'todo/create',
    component: TodoCreateComponent,
  },
  {
    path: 'todo/edit/:id',
    component: TodoEditComponent,
  },
  {
    path: '',
    component: TodoListComponent
  },
];