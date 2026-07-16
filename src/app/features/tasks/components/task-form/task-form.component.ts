import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task, TaskCategory, TaskPriority, TaskStatus } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatDatepickerModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);

  @Input() task?: Task;
  @Input() category: TaskCategory = 'PURCHASE';
  @Output() saved = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  form!: FormGroup;
  readonly categories: TaskCategory[] = ['PURCHASE', 'REPAIR', 'RENOVATION', 'ORGANIZATION', 'CLEANING'];
  readonly statuses: TaskStatus[] = ['NEW', 'IN_PROGRESS', 'COMPLETED'];
  readonly priorities: TaskPriority[] = ['LOW', 'MEDIUM', 'HIGH'];

  ngOnInit(): void {
    this.form = this.fb.group({
      category: [this.task?.category ?? this.category, Validators.required],
      title: [this.task?.title ?? '', Validators.required],
      description: [this.task?.description ?? '', Validators.required],
      status: [this.task?.status ?? 'NEW', Validators.required],
      priority: [this.task?.priority ?? 'MEDIUM', Validators.required],
      location: [this.task?.location ?? ''],
      estimated_cost: [this.task?.estimatedCost ?? ''],
      supplier: [this.task?.supplier ?? ''],
      due_date: [this.task?.dueDate ?? '']
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saved.emit();
    this.snackBar.open(this.task ? 'המשימה עודכנה' : 'המשימה נוצרה', 'סגור', { duration: 2500 });
  }

  cancel(): void {
    this.canceled.emit();
  }

  getFieldLabel(): string {
    switch (this.form?.value.category) {
      case 'PURCHASE':
        return 'שם מוצר';
      case 'REPAIR':
        return 'שם התקלה';
      case 'RENOVATION':
        return 'שם שיפוץ';
      case 'ORGANIZATION':
        return 'משימה';
      case 'CLEANING':
        return 'משימת ניקיון';
      default:
        return 'כותרת';
    }
  }
}
