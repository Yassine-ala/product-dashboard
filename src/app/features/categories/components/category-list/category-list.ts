import { Component, input, Input } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-list',
  imports: [],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})
export class CategoryList {
  categories = input.required<Category[]>();
}
