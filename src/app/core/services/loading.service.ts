import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loadingMap = new Map<string, boolean>();

  isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  setLoading(loading: boolean, key?: string): void {
    if (key) {
      if (loading) {
        this.loadingMap.set(key, loading);
      } else {
        this.loadingMap.delete(key);
      }
      this.loadingSubject.next(this.loadingMap.size > 0);
    } else {
      this.loadingSubject.next(loading);
    }
  }

  isLoading(key?: string): boolean {
    if (key) {
      return this.loadingMap.has(key);
    }
    return this.loadingSubject.value;
  }
}