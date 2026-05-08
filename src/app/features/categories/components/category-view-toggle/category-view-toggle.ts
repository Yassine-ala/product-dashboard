import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-category-view-toggle',
  imports: [],
  templateUrl: './category-view-toggle.html',
  styleUrl: './category-view-toggle.scss',
})
export class CategoryViewToggle {
  readonly viewMode = input.required<'grouped' | 'alphabetical'>();
  readonly viewModeChange = output<'grouped' | 'alphabetical'>();
}
