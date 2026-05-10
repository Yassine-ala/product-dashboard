import { Component, input, output } from '@angular/core';
import { CategoryViewToggle } from '../category-view-toggle/category-view-toggle';

@Component({
  selector: 'app-category-toolbar',
  imports: [
    CategoryViewToggle,
  ],
  templateUrl: './category-toolbar.html',
  styleUrl: './category-toolbar.scss',
})
export class CategoryToolbar {
  readonly search = input.required<string>();
  readonly selectedGroup = input.required<string>();
  readonly groups = input.required<string[]>();

  readonly searchChange = output<string>();
  readonly selectedGroupChange = output<string>();
}
