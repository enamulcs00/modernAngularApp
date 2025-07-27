import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

interface CacheEntry {
  response: HttpResponse<any>;
  timestamp: number;
}

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, CacheEntry>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only cache GET requests
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    // Skip caching for certain URLs
    if (this.shouldSkipCache(request.url)) {
      return next.handle(request);
    }

    const cachedResponse = this.getFromCache(request.url);
    
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.addToCache(request.url, event);
        }
      })
    );
  }

  private shouldSkipCache(url: string): boolean {
    const skipUrls = [
      '/auth/',
      '/user/profile',
      '/real-time'
    ];
    
    return skipUrls.some(skipUrl => url.includes(skipUrl));
  }

  private getFromCache(url: string): HttpResponse<any> | null {
    const cached = this.cache.get(url);
    
    if (!cached) {
      return null;
    }

    const isExpired = Date.now() - cached.timestamp > this.CACHE_DURATION;
    
    if (isExpired) {
      this.cache.delete(url);
      return null;
    }

    return cached.response;
  }

  private addToCache(url: string, response: HttpResponse<any>): void {
    const entry: CacheEntry = {
      response: response.clone(),
      timestamp: Date.now()
    };
    
    this.cache.set(url, entry);
    
    // Clean up old entries periodically
    this.cleanupCache();
  }

  private cleanupCache(): void {
    const now = Date.now();
    
    for (const [url, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.CACHE_DURATION) {
        this.cache.delete(url);
      }
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}