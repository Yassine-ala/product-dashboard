interface CategoryGroup {
  id: number;
  name: string;
  color?: string;
}

export interface Category {
  id: number;
  group?: CategoryGroup;
  wording: string;
  description: string | null;
}

export interface CategoryGroupViewModel {
  groupName: string;
  groupColor?: string;
  categories: Category[];
}
