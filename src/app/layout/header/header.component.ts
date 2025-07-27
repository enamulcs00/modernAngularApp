import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <div class="header-container">
        <div class="logo">
          <a routerLink="/">ModernApp</a>
        </div>
        
        <nav class="nav" [class.nav-open]="isMenuOpen">
          <a routerLink="/products" routerLinkActive="active">Products</a>
          <a routerLink="/categories" routerLinkActive="active">Categories</a>
          <a routerLink="/practice" routerLinkActive="active">Angular Practice</a>
        </nav>

        <div class="header-actions">
          <div class="user-menu" *ngIf="authService.currentUser$ | async; else loginButton">
            <span class="user-name">{{ (authService.currentUser$ | async)?.name }}</span>
            <button class="logout-btn" (click)="logout()">Logout</button>
          </div>
          
          <ng-template #loginButton>
            <a routerLink="/auth/login" class="login-link">Login</a>
          </ng-template>

          <button class="menu-toggle" (click)="toggleMenu()" [class.active]="isMenuOpen">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}