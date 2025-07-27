import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip auth header for certain requests
    if (this.shouldSkipAuth(request.url)) {
      return next.handle(request);
    }

    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser) {
      // Clone the request and add authorization header
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.getAuthToken()}`
        }
      });
      
      return next.handle(authRequest);
    }

    return next.handle(request);
  }

  private shouldSkipAuth(url: string): boolean {
    const skipUrls = [
      '/auth/login',
      '/auth/register',
      '/auth/forgot-password',
      '/public'
    ];
    
    return skipUrls.some(skipUrl => url.includes(skipUrl));
  }

  private getAuthToken(): string {
    // In a real app, you would get this from localStorage or a secure storage
    // For demo purposes, we'll return a mock token
    return 'mock-jwt-token';
  }
}