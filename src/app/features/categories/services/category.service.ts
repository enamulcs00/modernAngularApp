import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Category } from '../../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private mockCategories: Category[] = [
    {
      id: 1,
      name: 'Electronics',
      description: 'Electronic devices and accessories',
      createdAt: new Date()
    },
    {
      id: 2,
      name: 'Computers',
      description: 'Laptops, desktops, and computer accessories',
      createdAt: new Date()
    },
    {
      id: 3,
      name: 'Home & Garden',
      description: 'Home improvement and garden supplies',
      createdAt: new Date()
    },
    {
      id: 4,
      name: 'Sports & Outdoors',
      description: 'Sports equipment and outdoor gear',
      createdAt: new Date()
    }
  ];

  getCategories(): Observable<Category[]> {
    return of(this.mockCategories).pipe(delay(400));
  }

  getCategory(id: number): Observable<Category | undefined> {
    const category = this.mockCategories.find(c => c.id === id);
    return of(category).pipe(delay(200));
  }
}