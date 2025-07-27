import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

// Directives
import { LazyLoadDirective } from './directives/lazy-load.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { AutofocusDirective } from './directives/autofocus.directive';

// Pipes
import { TruncatePipe } from './pipes/truncate.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

const COMPONENTS = [
  LoadingSpinnerComponent,
  ConfirmDialogComponent,
  EmptyStateComponent,
  PageHeaderComponent
];

const DIRECTIVES = [
  LazyLoadDirective,
  ClickOutsideDirective,
  AutofocusDirective
];

const PIPES = [
  TruncatePipe,
  SafeHtmlPipe,
  CurrencyFormatPipe,
  TimeAgoPipe
];

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule
];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
    ...MODULES
  ]
})
export class SharedModule {}