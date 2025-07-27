import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="empty-state">
      <div class="empty-icon">
        <span>{{ icon }}</span>
      </div>
      <h3 class="empty-title">{{ title }}</h3>
      <p class="empty-description">{{ description }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .empty-state {
      text-align: center;
      padding: 3rem 2rem;
      color: #6B7280;
    }

    .empty-icon {
      width: 80px;
      height: 80px;
      background: #F3F4F6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      font-size: 2rem;
    }

    .empty-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1F2937;
      margin: 0 0 0.5rem 0;
    }

    .empty-description {
      margin: 0 0 1.5rem 0;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .empty-state {
        padding: 2rem 1rem;
      }

      .empty-icon {
        width: 60px;
        height: 60px;
        font-size: 1.5rem;
      }

      .empty-title {
        font-size: 1.125rem;
      }
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon = '📦';
  @Input() title = 'No items found';
  @Input() description = 'There are no items to display at the moment.';
}