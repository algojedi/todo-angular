import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from '../../features/todos/types';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input() initialValue?: Partial<Todo>;
  @Output() formSubmit = new EventEmitter<Partial<Todo>>();

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(5)]],
  });

  ngOnInit() {
    if (this.initialValue) {
      this.form.patchValue(this.initialValue);
    }
  }

  submit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value as Partial<Todo>);
    }
  }
}

