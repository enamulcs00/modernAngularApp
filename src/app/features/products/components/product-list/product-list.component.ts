import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="product-container">
      <div class="product-header">
        <h1>Products</h1>
        <div class="search-container">
          <input 
            type="text" 
            placeholder="Search products..."
            [(ngModel)]="searchQuery"
            (input)="onSearch()"
            class="search-input"
          >
        </div>
      </div>

      <div class="loading" *ngIf="isLoading">
        <div class="spinner"></div>
        <p>Loading products...</p>
      </div>

      <div class="product-grid" *ngIf="!isLoading">
        <div class="product-card" *ngFor="let product of products; trackBy: trackByProductId">
          <div class="product-image">
            <img [src]="product.image" [alt]="product.name" loading="lazy">
            <div class="stock-badge" [class.out-of-stock]="!product.inStock">
              {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
            </div>
          </div>
          
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-price">\${{ product.price | number:'1.2-2' }}</div>
            
            <button 
              class="add-to-cart-btn"
              [disabled]="!product.inStock"
              (click)="addToCart(product)"
            >
              {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
            </button>
          </div>
        </div>
      </div>

      <div class="empty-state" *ngIf="!isLoading && products.length === 0">
        <h2>No products found</h2>
        <p>Try adjusting your search criteria</p>
      </div>
    </div>
  `,
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchQuery = '';
  isLoading = true;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.isLoading = true;
      this.productService.searchProducts(this.searchQuery).subscribe({
        next: (products) => {
          this.products = products;
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.loadProducts();
    }
  }

  addToCart(product: Product): void {
    // Mock add to cart functionality
    console.log('Added to cart:', product.name);
    // Here you would typically call a cart service
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}