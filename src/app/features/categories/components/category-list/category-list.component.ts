import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../../models/category.model';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="category-container">
      <div class="category-header">
        <h1>Categories</h1>
        <p>Browse our product categories</p>
      </div>

      <div class="loading" *ngIf="isLoading">
        <div class="spinner"></div>
        <p>Loading categories...</p>
      </div>

      <div class="category-grid" *ngIf="!isLoading">
        <div class="category-card" *ngFor="let category of categories; trackBy: trackByCategoryId">
          <div class="category-icon">
            <span>{{ getCategoryIcon(category.name) }}</span>
          </div>
          <div class="category-info">
            <h3 class="category-name">{{ category.name }}</h3>
            <p class="category-description">{{ category.description }}</p>
            <button class="view-category-btn" (click)="viewCategory(category)">
              View Products
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  isLoading = true;

  constructor(
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getCategoryIcon(categoryName: string): string {
    const iconMap: { [key: string]: string } = {
      'Electronics': '📱',
      'Computers': '💻',
      'Home & Garden': '🏡',
      'Sports & Outdoors': '⚽'
    };
    return iconMap[categoryName] || '📦';
  }

  viewCategory(category: Category): void {
    console.log('View category:', category.name);
    // Here you would typically navigate to products filtered by category
  }

  trackByCategoryId(index: number, category: Category): number {
    return category.id;
  }
}