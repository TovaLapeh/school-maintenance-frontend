export type UserRole = 'Teacher' | 'Maintenance Worker' | 'Manager';

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: UserRole;
}

export interface CreateUserRequest {
  full_name: string;
  email: string;
  role: UserRole;
}
