import { Component, input, output } from '@angular/core';
import { Category, CategoryGroupViewModel } from '../../models/category.model';
import { CategoryList } from '../category-list/category-list';

@Component({
  selector: 'app-category-group-section',
  imports: [CategoryList],
  templateUrl: './category-group-section.html',
  styleUrl: './category-group-section.scss',
})
export class CategoryGroupSection {
  section = input.required<CategoryGroupViewModel>();
  readonly selectedCategory = input<Category | null>(null);
  readonly categorySelection = output<Category>();
}
