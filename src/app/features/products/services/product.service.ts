import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private mockProducts: Product[] = [
    {
      id: 1,
      name: 'Smartphone Pro',
      description: 'Latest smartphone with advanced features',
      price: 699.99,
      categoryId: 1,
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
      createdAt: new Date()
    },
    {
      id: 2,
      name: 'Laptop Ultra',
      description: 'High-performance laptop for professionals',
      price: 1299.99,
      categoryId: 2,
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
      createdAt: new Date()
    },
    {
      id: 3,
      name: 'Wireless Headphones',
      description: 'Premium noise-canceling headphones',
      price: 299.99,
      categoryId: 1,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: false,
      createdAt: new Date()
    },
    {
      id: 4,
      name: 'Gaming Monitor',
      description: '4K gaming monitor with high refresh rate',
      price: 599.99,
      categoryId: 2,
      image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
      createdAt: new Date()
    }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.mockProducts).pipe(delay(500));
  }

  getProduct(id: number): Observable<Product | undefined> {
    const product = this.mockProducts.find(p => p.id === id);
    return of(product).pipe(delay(300));
  }

  searchProducts(query: string): Observable<Product[]> {
    const filtered = this.mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(300));
  }
}