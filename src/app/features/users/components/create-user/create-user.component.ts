import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CreateUserRequest, UserRole } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  private readonly fb = inject(FormBuilder);
  private readonly usersService = inject(UsersService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  userForm: FormGroup;
  isSubmitting = false;
  roles: UserRole[] = ['Teacher', 'Maintenance Worker', 'Manager'];

  constructor() {
    this.userForm = this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['Teacher', Validators.required]
    });
  }

  submit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const payload: CreateUserRequest = this.userForm.value;

    this.usersService.createUser(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.snackBar.open('User created successfully.', 'Close', { duration: 3000 });
        this.router.navigate(['/users']);
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }
}
