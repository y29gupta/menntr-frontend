export type RowType = 'PRINCIPAL' | 'CATEGORY' | 'DEPARTMENT';

export interface Department {
  id: string;
  name: string;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  isNew?: boolean;
  departments: Department[];
}
