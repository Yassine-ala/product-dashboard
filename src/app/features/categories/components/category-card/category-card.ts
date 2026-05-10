import { Component, computed, input, output } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss',
})
export class CategoryCard {
  readonly category = input.required<Category>();
  readonly showGroupBadge = input(false);
  readonly selected = input(false);
  readonly categorySelection = output<void>();

  readonly groupColor = computed(() =>
    this.category().group?.color?.slice(2)
  );
}
