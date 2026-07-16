import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
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
