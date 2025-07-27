import {  Routes } from "@angular/router";

export const genericFeatureRoute :Routes = [
  {
    path: '',
    loadComponent: () => import('./practice/practice').then(m => m.PracticeComponent)
  }
];