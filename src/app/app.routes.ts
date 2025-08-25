import { Routes } from '@angular/router';
import { TodoCreateComponent } from './features/todos/create/todo-create.component';
import { TodoEditComponent } from './features/todos/edit/todo-edit.component';
import { TodoListComponent } from './features/todos/list/todo-list.component';
import { NotfoundComponent } from './features/todos/notfound/notfound.component';
import { GraphComponent } from './features/graph/graph.component';

export const routes: Routes = [
  {
    path: 'todo/create',
    component: TodoCreateComponent,
  },
  {
    path: 'todo/edit/:id',
    component: TodoEditComponent,
  },
  { path: 'graph', component: GraphComponent },
  {
    path: '',
    component: TodoListComponent,
  },
  { path: 'not-found', component: NotfoundComponent },
];
/*
path: 'todos',
    children: [
      {
        path: '',
        component: 'TodosPageComponent'
      },
      {
        path: ':id',
        component: 'TodoPageComponent'
      }
    ] */
