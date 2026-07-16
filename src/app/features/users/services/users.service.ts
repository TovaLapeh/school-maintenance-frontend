import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '../../../core/services/app-config.service';
import { CreateUserRequest, User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly appConfig = inject(AppConfigService);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.appConfig.apiBaseUrl}/users/`);
  }

  createUser(user: CreateUserRequest): Observable<User> {
    return this.http.post<User>(`${this.appConfig.apiBaseUrl}/users/`, user);
  }
}
