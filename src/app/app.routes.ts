import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    loadComponent: () => import('./features/tasks/components/tasks-page/tasks-page.component').then((m) => m.TasksPageComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./features/users/components/users-list/users-list.component').then((m) => m.UsersListComponent)
  },
  {
    path: 'users/create',
    loadComponent: () => import('./features/users/components/create-user/create-user.component').then((m) => m.CreateUserComponent)
  }
];
