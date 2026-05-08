import { Component, inject, OnInit } from '@angular/core';
import { CategoriesApiService } from '../../api/categories-api.service';
import { Category } from '../../models/category.model';
import { forkJoin } from 'rxjs';
import { CategoryList } from '../../components/category-list/category-list';

@Component({
  selector: 'app-category-selector-page',
  imports: [
    CategoryList
  ],
  templateUrl: './category-selector-page.html',
  styleUrl: './category-selector-page.scss',
})
export class CategorySelectorPage implements OnInit {
  private readonly _categoriesApi = inject(CategoriesApiService);
  isLoading = false;
  hasError = false;

  categories: Category[] = [];

  ngOnInit(): void {
    this._loadCategories();
  }

  // requêtes indépendantes -> forkJoin pour parallèliser
  private _loadCategories(): void {
    this.isLoading = true;
    this.hasError = false;

    forkJoin([
      this._categoriesApi.getAllCategories(),
      this._categoriesApi.getVisibleCategoryIds(),
    ]).subscribe({
      next: ([categories, visibleIds]) => {
        this.categories = categories.filter(category =>
          visibleIds.includes(category.id)
        );
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
