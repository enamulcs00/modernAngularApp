import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          switch (error.status) {
            case 400:
              errorMessage = 'Bad Request - Please check your input';
              break;
            case 401:
              errorMessage = 'Unauthorized - Please log in again';
              this.authService.logout();
              this.router.navigate(['/auth/login']);
              break;
            case 403:
              errorMessage = 'Forbidden - You do not have permission';
              break;
            case 404:
              errorMessage = 'Not Found - The requested resource was not found';
              break;
            case 422:
              errorMessage = 'Validation Error - Please check your input';
              break;
            case 429:
              errorMessage = 'Too Many Requests - Please try again later';
              break;
            case 500:
              errorMessage = 'Internal Server Error - Please try again later';
              break;
            case 502:
              errorMessage = 'Bad Gateway - Service temporarily unavailable';
              break;
            case 503:
              errorMessage = 'Service Unavailable - Please try again later';
              break;
            default:
              errorMessage = `Error ${error.status}: ${error.message}`;
          }
        }

        // Show notification for errors (except 401 which redirects)
        if (error.status !== 401) {
          this.notificationService.error('Request Failed', errorMessage);
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}