import { Category } from '../models/category.model';
import {
  filterCategoriesByGroup,
  filterCategoriesBySearch,
  groupCategoriesByGroup,
  sortCategoriesAlphabetically,
} from './category-filter.utils';

const categories: Category[] = [
  {
    id: 1,
    wording: 'Zèbre',
    description: 'Catégorie des animaux',
    group: { id: 1, name: 'Animaux', color: 'm-green' },
  },
  {
    id: 2,
    wording: 'Pomme',
    description: 'Catégorie des fruits',
    group: { id: 2, name: 'Alimentation', color: 'm-red' },
  },
  {
    id: 3,
    wording: 'Sans groupe',
    description: null,
  },
];

describe('category-filter.utils', () => {
  it('should sort categories alphabetically by wording', () => {
    const result = sortCategoriesAlphabetically(categories);

    expect(result.map(category => category.wording)).toEqual([
      'Pomme',
      'Sans groupe',
      'Zèbre',
    ]);
  });

  it('should filter categories by wording', () => {
    const result = filterCategoriesBySearch(categories, 'pom');

    expect(result).toEqual([categories[1]]);
  });

  it('should filter categories by description', () => {
    const result = filterCategoriesBySearch(categories, 'animaux');

    expect(result).toEqual([categories[0]]);
  });

  it('should return all categories when search is empty', () => {
    const result = filterCategoriesBySearch(categories, '   ');

    expect(result).toEqual(categories);
  });

  it('should filter categories by group', () => {
    const result = filterCategoriesByGroup(categories, 'Alimentation');

    expect(result).toEqual([categories[1]]);
  });

  it('should return all categories when no group is selected', () => {
    const result = filterCategoriesByGroup(categories, '');

    expect(result).toEqual(categories);
  });

  it('should group categories by group name', () => {
    const result = groupCategoriesByGroup(categories);

    expect(result).toEqual([
      {
        groupName: 'Animaux',
        groupColor: 'green',
        categories: [categories[0]],
      },
      {
        groupName: 'Alimentation',
        groupColor: 'red',
        categories: [categories[1]],
      },
      {
        groupName: 'Non catégorisé',
        groupColor: undefined,
        categories: [categories[2]],
      },
    ]);
  });
});
