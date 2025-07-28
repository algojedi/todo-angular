import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    id = signal(this.route.snapshot.paramMap.get('id'));
  }