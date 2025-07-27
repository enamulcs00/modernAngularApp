import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">{{ title }}</h1>
          <p class="page-subtitle" *ngIf="subtitle">{{ subtitle }}</p>
        </div>
        <div class="header-actions" *ngIf="showActions">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      background: white;
      border-bottom: 1px solid #E5E7EB;
      padding: 2rem 0;
      margin-bottom: 2rem;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    .header-text {
      flex: 1;
    }

    .page-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1F2937;
      margin: 0 0 0.5rem 0;
    }

    .page-subtitle {
      color: #6B7280;
      margin: 0;
      font-size: 1.125rem;
    }

    .header-actions {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }

    @media (max-width: 768px) {
      .page-header {
        padding: 1.5rem 0;
      }

      .header-content {
        flex-direction: column;
        align-items: stretch;
        text-align: center;
      }

      .page-title {
        font-size: 1.5rem;
      }

      .page-subtitle {
        font-size: 1rem;
      }

      .header-actions {
        justify-content: center;
        margin-top: 1rem;
      }
    }
  `]
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() showActions = true;
}