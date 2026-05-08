import { Routes } from '@angular/router';
import { CategorySelectorPage } from './features/categories/pages/category-selector-page/category-selector-page';

export const routes: Routes = [
  {
    path: '',
    component: CategorySelectorPage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
