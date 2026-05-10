import { Component, input, output } from '@angular/core';
import { CategoryViewToggle } from '../category-view-toggle/category-view-toggle';

@Component({
  selector: 'app-category-header',
  imports: [CategoryViewToggle],
  templateUrl: './category-header.html',
  styleUrl: './category-header.scss',
})
export class CategoryHeader {
  readonly viewMode = input.required<'grouped' | 'alphabetical'>();
  readonly viewModeChange = output<'grouped' | 'alphabetical'>();
}
