import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Task, TaskCategory } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent {
  @Input() task?: Task;
  @Output() close = new EventEmitter<void>();

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
