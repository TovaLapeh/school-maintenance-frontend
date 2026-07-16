import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Task, TaskCategory } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatDialogModule, MatProgressSpinnerModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() isLoading = false;
  @Input() category: TaskCategory = 'PURCHASE';
  @Output() view = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  readonly displayedColumns = ['title', 'description', 'status', 'priority', 'date', 'actions'];

  startNewTask(): void {
    this.edit.emit({
      id: 0,
      category: this.category,
      title: '',
      description: '',
      status: 'NEW',
      priority: 'MEDIUM',
      createdDate: ''
    } as Task);
  }

  getStatusLabel(status: Task['status']): string {
    switch (status) {
      case 'NEW':
        return 'חדש';
      case 'IN_PROGRESS':
        return 'בטיפול';
      case 'COMPLETED':
        return 'הושלם';
      default:
        return status;
    }
  }

  getPriorityLabel(priority: Task['priority']): string {
    switch (priority) {
      case 'LOW':
        return 'נמוך';
      case 'MEDIUM':
        return 'בינוני';
      case 'HIGH':
        return 'גבוה';
      default:
        return priority;
    }
  }

  getCategoryLabel(category: TaskCategory): string {
    switch (category) {
      case 'PURCHASE':
        return 'רכש';
      case 'REPAIR':
        return 'תיקונים';
      case 'RENOVATION':
        return 'שיפוצים';
      case 'ORGANIZATION':
        return 'סדר וארגון';
      case 'CLEANING':
        return 'ניקיון';
      default:
        return category;
    }
  }
}
