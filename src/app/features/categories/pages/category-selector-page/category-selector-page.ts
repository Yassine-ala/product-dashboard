import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';

import { CategoriesApiService } from '../../api/categories-api.service';
import { Category } from '../../models/category.model';
import { CategoryList } from '../../components/category-list/category-list';
import {
  filterCategoriesByGroup,
  filterCategoriesBySearch,
  groupCategoriesByGroup,
  sortCategoriesAlphabetically
} from '../../utils/category-filter.utils';
import { CategoryGroupSection } from '../../components/category-group-section/category-group-section';
import { CategorySelectionFooter } from '../../components/category-selection-footer/category-selection-footer';
import { CategoryToolbar } from '../../components/category-toolbar/category-toolbar';
import { CategoryHeader } from '../../components/category-header/category-header';

const COMPONENTS = [
  CategoryList,
  CategoryGroupSection,
  CategorySelectionFooter,
  CategoryToolbar,
  CategoryHeader
];

@Component({
  selector: 'app-category-selector-page',
  imports: COMPONENTS,
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

  readonly selectedGroup = signal('');
  readonly selectedCategory = signal<Category | null>(null);

  readonly filteredCategories = computed(() => {
    const searchFilteredCategories = filterCategoriesBySearch(
      this.categories(),
      this.search()
    );

    return filterCategoriesByGroup(
      searchFilteredCategories,
      this.selectedGroup()
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

  readonly availableGroups = computed(() =>
    Array.from(
      new Set(
        this.categories()
          .map(category => category.group?.name)
          .filter((group): group is string => !!group)
      )
    ));

  readonly clearSelectionEffect = effect(() => {
    const selectedCategory = this.selectedCategory();
    const filteredCategories = this.filteredCategories();

    if (
      selectedCategory &&
      !filteredCategories.some(
        category => category.id === selectedCategory.id
      )
    ) {
      this.selectedCategory.set(null);
    }
  });

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

  onCategorySelection(category: Category): void {
    this.selectedCategory.set(category);
  }

  onValidateSelection(): void {
    console.log(this.selectedCategory());
  }
}
