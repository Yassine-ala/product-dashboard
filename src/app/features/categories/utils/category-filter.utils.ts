import { Category, CategoryGroupViewModel } from '../models/category.model';

export function sortCategoriesAlphabetically(
  categories: Category[]
): Category[] {
  return [...categories].sort((a, b) =>
    a.wording.localeCompare(b.wording)
  );
}

export function filterCategoriesBySearch(
  categories: Category[],
  search: string
): Category[] {
  if (!search.trim()) {
    return categories;
  }

  const normalizedSearch = search.toLowerCase();

  return categories.filter(category =>
    category.wording.toLowerCase().includes(normalizedSearch)
    || category.description?.toLowerCase().includes(normalizedSearch)
  );
}

export function filterCategoriesByGroup(
  categories: Category[],
  selectedGroup: string
): Category[] {
  if (!selectedGroup) {
    return categories;
  }

  return categories.filter(
    category => category.group?.name === selectedGroup
  );
}

export function groupCategoriesByGroup(categories: Category[]): CategoryGroupViewModel[] {
  const groups = new Map<string, CategoryGroupViewModel>();

  categories.forEach(category => {
    const groupName = category.group?.name ?? 'Non catégorisé';
    // slice pour virer les m- en attendant de comprendre le préfixe
    const groupColor = category.group?.color?.slice(2);

    if (!groups.has(groupName)) {
      groups.set(groupName, {
        groupName,
        groupColor,
        categories: [],
      });
    }

    groups.get(groupName)!.categories.push(category);
  });

  return Array.from(groups.values());
}
