import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '../../../core/services/app-config.service';
import { Task, TaskCreateRequest, TaskUpdateRequest } from '../../../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly appConfig = inject(AppConfigService);

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.appConfig.apiBaseUrl}/tasks/`);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.appConfig.apiBaseUrl}/tasks/${id}`);
  }

  createTask(task: TaskCreateRequest): Observable<Task> {
    return this.http.post<Task>(`${this.appConfig.apiBaseUrl}/tasks/`, task);
  }

  updateTask(id: number, task: TaskUpdateRequest): Observable<Task> {
    return this.http.put<Task>(`${this.appConfig.apiBaseUrl}/tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.appConfig.apiBaseUrl}/tasks/${id}`);
  }
}
