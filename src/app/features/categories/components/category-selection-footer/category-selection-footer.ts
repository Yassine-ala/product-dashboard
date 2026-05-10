import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-category-selection-footer',
  imports: [],
  templateUrl: './category-selection-footer.html',
  styleUrl: './category-selection-footer.scss',
})
export class CategorySelectionFooter {
  readonly isSelectionDisabled = input.required<boolean>();
  readonly validateSelection = output<void>();

}
