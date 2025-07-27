import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dialog-overlay" *ngIf="isOpen" (click)="onOverlayClick()">
      <div class="dialog-content" (click)="$event.stopPropagation()">
        <div class="dialog-header">
          <h3>{{ title }}</h3>
        </div>
        
        <div class="dialog-body">
          <p>{{ message }}</p>
        </div>
        
        <div class="dialog-actions">
          <button class="btn btn-secondary" (click)="onCancel()">
            {{ cancelText }}
          </button>
          <button class="btn btn-primary" (click)="onConfirm()">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.2s ease-out;
    }

    .dialog-content {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      max-width: 400px;
      width: 90%;
      animation: slideUp 0.2s ease-out;
    }

    .dialog-header {
      padding: 1.5rem 1.5rem 0;
    }

    .dialog-header h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #1F2937;
    }

    .dialog-body {
      padding: 1rem 1.5rem;
    }

    .dialog-body p {
      margin: 0;
      color: #6B7280;
      line-height: 1.5;
    }

    .dialog-actions {
      padding: 0 1.5rem 1.5rem;
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
    }

    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-secondary {
      background: #F3F4F6;
      color: #374151;
    }

    .btn-secondary:hover {
      background: #E5E7EB;
    }

    .btn-primary {
      background: #3B82F6;
      color: white;
    }

    .btn-primary:hover {
      background: #2563EB;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class ConfirmDialogComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed?';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmed.emit();
    this.isOpen = false;
  }

  onCancel(): void {
    this.cancelled.emit();
    this.isOpen = false;
  }

  onOverlayClick(): void {
    this.onCancel();
  }
}