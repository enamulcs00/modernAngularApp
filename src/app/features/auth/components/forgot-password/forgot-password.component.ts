import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Reset Password</h1>
        <p class="auth-subtitle">Enter your email to receive reset instructions</p>
        
        <form (ngSubmit)="onSubmit()" #forgotForm="ngForm" class="auth-form" *ngIf="!isSuccess">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              [(ngModel)]="email"
              required
              email
              #emailInput="ngModel"
              class="form-input"
              [class.error]="emailInput.invalid && emailInput.touched"
            >
            <div class="error-message" *ngIf="emailInput.invalid && emailInput.touched">
              <span *ngIf="emailInput.errors?.['required']">Email is required</span>
              <span *ngIf="emailInput.errors?.['email']">Please enter a valid email</span>
            </div>
          </div>

          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>

          <button 
            type="submit" 
            class="auth-button primary"
            [disabled]="forgotForm.invalid || isLoading"
          >
            <span *ngIf="!isLoading">Send Reset Instructions</span>
            <span *ngIf="isLoading">Sending...</span>
          </button>
        </form>

        <div class="success-message" *ngIf="isSuccess">
          <div class="success-icon">✓</div>
          <h2>Check Your Email</h2>
          <p>We've sent password reset instructions to {{ email }}</p>
        </div>

        <div class="auth-links">
          <a routerLink="/auth/login">Back to Sign In</a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../auth.component.css']
})
export class ForgotPasswordComponent {
  email = '';
  isLoading = false;
  isSuccess = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (this.email) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.forgotPassword(this.email).subscribe({
        next: () => {
          this.isLoading = false;
          this.isSuccess = true;
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error;
        }
      });
    }
  }
}