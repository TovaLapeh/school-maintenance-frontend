import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task, TaskCategory } from '../../../../shared/models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatButtonModule, MatIconModule, TaskListComponent, TaskFormComponent, TaskDetailsComponent],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.scss'
})
export class TasksPageComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  readonly tabs: Array<{ key: TaskCategory; label: string }> = [
    { key: 'PURCHASE', label: 'רכש' },
    { key: 'REPAIR', label: 'תיקונים' },
    { key: 'RENOVATION', label: 'שיפוצים' },
    { key: 'ORGANIZATION', label: 'סדר וארגון' },
    { key: 'CLEANING', label: 'ניקיון' }
  ];

  selectedCategory: TaskCategory = 'PURCHASE';
  tasks: Task[] = [];
  isLoading = false;
  selectedTask?: Task;
  showForm = false;
  editingTask?: Task;

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (response) => {
        this.tasks = response.filter((task) => task.category === this.selectedCategory);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('לא ניתן לטעון את המשימות', 'סגור', { duration: 2500 });
      }
    });
  }

  getSelectedIndex(): number {
    return this.tabs.findIndex((tab) => tab.key === this.selectedCategory);
  }

  onTabChange(category: TaskCategory): void {
    this.selectedCategory = category;
    this.loadTasks();
  }

  openCreate(): void {
    this.editingTask = undefined;
    this.showForm = true;
  }

  openEdit(task: Task): void {
    this.editingTask = task;
    this.showForm = true;
  }

  openDetails(task: Task): void {
    this.selectedTask = task;
  }

  saveTask(): void {
    const payload = {
      category: this.editingTask?.category ?? this.selectedCategory,
      title: 'משימה חדשה',
      description: 'נוסף דרך הממשק',
      status: 'NEW' as const,
      priority: 'MEDIUM' as const
    };

    this.taskService.createTask(payload).subscribe({
      next: () => {
        this.showForm = false;
        this.loadTasks();
        this.snackBar.open('המשימה נשמרה', 'סגור', { duration: 2500 });
      },
      error: () => {
        this.snackBar.open('התרחשה שגיאה בשמירה', 'סגור', { duration: 2500 });
      }
    });
  }

  deleteTask(task: Task): void {
    const confirmed = window.confirm('האם אתה בטוח שברצונך למחוק?');
    if (!confirmed) {
      return;
    }

    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.loadTasks();
        this.snackBar.open('המשימה נמחקה', 'סגור', { duration: 2500 });
      },
      error: () => {
        this.snackBar.open('לא ניתן למחוק את המשימה', 'סגור', { duration: 2500 });
      }
    });
  }
}
