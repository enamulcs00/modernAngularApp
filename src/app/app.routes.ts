import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes').then(m => m.productsRoutes),
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    loadChildren: () => import('./features/categories/categories.routes').then(m => m.categoriesRoutes),
    canActivate: [AuthGuard]
  },
  {
    path:'practice',
    loadChildren: () => import('./features/generic-feature-route').then(m => m.genericFeatureRoute),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/products'
  }
];