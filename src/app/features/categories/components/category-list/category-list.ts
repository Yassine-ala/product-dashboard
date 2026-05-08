import { Component, input } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryCard } from '../category-card/category-card';

@Component({
  selector: 'app-category-list',
  imports: [CategoryCard],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})
export class CategoryList {
  readonly categories = input.required<Category[]>();
  readonly showGroupBadge = input(false);
}
