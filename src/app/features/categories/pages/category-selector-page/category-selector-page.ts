import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';

import { CategoriesApiService } from '../../api/categories-api.service';
import { Category } from '../../models/category.model';
import { CategoryList } from '../../components/category-list/category-list';
import {
  filterCategoriesBySearch,
  groupCategoriesByGroup,
  sortCategoriesAlphabetically
} from '../../utils/category-filter.utils';
import { CategoryGroupSection } from '../../components/category-group-section/category-group-section';
import { CategoryViewToggle } from '../../components/category-view-toggle/category-view-toggle';

@Component({
  selector: 'app-category-selector-page',
  imports: [CategoryList, CategoryGroupSection, CategoryViewToggle],
  templateUrl: './category-selector-page.html',
  styleUrl: './category-selector-page.scss',
})
export class CategorySelectorPage implements OnInit {
  private readonly _categoriesApi = inject(CategoriesApiService);

  readonly isLoading = signal(false);
  readonly hasError = signal(false);
  readonly categories = signal<Category[]>([]);

  readonly search = signal('');
  readonly viewMode = signal<'grouped' | 'alphabetical'>('grouped');

  readonly filteredCategories = computed(() => {
    return filterCategoriesBySearch(
      this.categories(),
      this.search()
    );
  });

  readonly sortedCategories = computed(() => {
    return sortCategoriesAlphabetically(
      this.filteredCategories()
    );
  });

  readonly groupedCategories = computed(() =>
    groupCategoriesByGroup(this.filteredCategories())
  );

  ngOnInit(): void {
    this._loadCategories();
  }

  // requêtes indépendantes -> forkJoin pour paralléliser
  private _loadCategories(): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    forkJoin([
      this._categoriesApi.getAllCategories(),
      this._categoriesApi.getVisibleCategoryIds(),
    ])
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: ([categories, visibleIds]) => {
          this.categories.set(
            categories.filter(category => visibleIds.includes(category.id))
          );
        },
        error: error => {
          console.error(error);
          this.hasError.set(true);
        },
      });
  }
}
