import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Create Account</h1>
        <p class="auth-subtitle">Join us today</p>
        
        <form (ngSubmit)="onSubmit()" #registerForm="ngForm" class="auth-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              [(ngModel)]="userData.name"
              required
              minlength="2"
              #name="ngModel"
              class="form-input"
              [class.error]="name.invalid && name.touched"
            >
            <div class="error-message" *ngIf="name.invalid && name.touched">
              <span *ngIf="name.errors?.['required']">Name is required</span>
              <span *ngIf="name.errors?.['minlength']">Name must be at least 2 characters</span>
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              [(ngModel)]="userData.email"
              required
              email
              #email="ngModel"
              class="form-input"
              [class.error]="email.invalid && email.touched"
            >
            <div class="error-message" *ngIf="email.invalid && email.touched">
              <span *ngIf="email.errors?.['required']">Email is required</span>
              <span *ngIf="email.errors?.['email']">Please enter a valid email</span>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              [(ngModel)]="userData.password"
              required
              minlength="6"
              #password="ngModel"
              class="form-input"
              [class.error]="password.invalid && password.touched"
            >
            <div class="error-message" *ngIf="password.invalid && password.touched">
              <span *ngIf="password.errors?.['required']">Password is required</span>
              <span *ngIf="password.errors?.['minlength']">Password must be at least 6 characters</span>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword"
              [(ngModel)]="userData.confirmPassword"
              required
              #confirmPassword="ngModel"
              class="form-input"
              [class.error]="confirmPassword.invalid && confirmPassword.touched || passwordMismatch"
            >
            <div class="error-message" *ngIf="confirmPassword.touched && passwordMismatch">
              Passwords do not match
            </div>
          </div>

          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>

          <button 
            type="submit" 
            class="auth-button primary"
            [disabled]="registerForm.invalid || passwordMismatch || isLoading"
          >
            <span *ngIf="!isLoading">Create Account</span>
            <span *ngIf="isLoading">Creating Account...</span>
          </button>
        </form>

        <div class="auth-links">
          <p>Already have an account? <a routerLink="/auth/login">Sign in</a></p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../auth.component.css']
})
export class RegisterComponent {
  userData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get passwordMismatch(): boolean {
    return this.userData.password !== this.userData.confirmPassword && 
           this.userData.confirmPassword.length > 0;
  }

  onSubmit(): void {
    if (this.userData.name && this.userData.email && this.userData.password && !this.passwordMismatch) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.register(this.userData.name, this.userData.email, this.userData.password).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error;
        }
      });
    }
  }
}