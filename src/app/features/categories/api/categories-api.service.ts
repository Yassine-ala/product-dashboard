import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api';

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/all-categories`);
  }

  // visible-categories renvoi { id: number }[], à ce stade pas la peine de faire de model et autant mapper directement
  getVisibleCategoryIds(): Observable<number[]> {
    return this.http.get<{ id: number }[]>(`${this.baseUrl}/visible-categories`)
      .pipe(
        map((items:  { id: number }[])=> items.map((item: { id: number }) => item.id))
      );
  }
}
