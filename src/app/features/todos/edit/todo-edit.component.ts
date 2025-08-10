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
  private readonly todoService = inject(TodoService);

  // The id from the URL
  private id = signal<string | null>(this.route.snapshot.paramMap.get('id'));

  // The todo stored as a signal
  todo = signal<Todo | null>(null);

  // Assuming TodoFormComponent exposes a `form` property
  form = TodoFormComponent.prototype.form; // Replace with actual form creation

  ngOnInit(): void {
    this.loadTodo();
  }

  private loadTodo(): void {
    const id = this.id();
    if (!id) {
      this.router.navigate(['/not-found']);
      return;
    }

    this.todoService.getTodo(id).subscribe({
      next: (response) => {
        const fetchedTodo = response.data;
        this.todo.set(fetchedTodo);

        // Populate the form
        this.form.patchValue({
          title: fetchedTodo.title,
          description: fetchedTodo.description,
        });

        /*
        // Debug form changes
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
      */
      },
      error: (error) => {
        console.error('Error fetching todo:', error);
        this.router.navigate(['/not-found']);
      },
    });
  }

  onSubmit(updatedValue: Partial<Todo>) {
    const current = this.todo();
    if (!current) return;

    const updatedTodo: Todo = {
      ...current,
      ...updatedValue,
      updatedAt: new Date()
    };

    console.log('Updating todo:', updatedTodo);
    // Call API to update
  }
}
