import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { retryWhen, mergeMap, finalize } from 'rxjs/operators';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000; // 1 second

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only retry GET requests and specific error codes
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      retryWhen(errors =>
        errors.pipe(
          mergeMap((error: HttpErrorResponse, index: number) => {
            // Don't retry client errors (4xx) except for 408 (timeout)
            if (error.status >= 400 && error.status < 500 && error.status !== 408) {
              return throwError(() => error);
            }

            // Don't retry after max attempts
            if (index >= this.MAX_RETRIES) {
              return throwError(() => error);
            }

            // Exponential backoff: delay increases with each retry
            const delay = this.RETRY_DELAY * Math.pow(2, index);
            
            console.log(`Retrying request (attempt ${index + 1}/${this.MAX_RETRIES}) after ${delay}ms`);
            
            return timer(delay);
          })
        )
      )
    );
  }
}