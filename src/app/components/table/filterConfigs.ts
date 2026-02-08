import { FilterSection } from './types';

/* SUPER ADMIN FILTER UI */
export const SUPER_ADMIN_FILTERS: FilterSection[] = [
  {
    key: 'department',
    title: 'Department',
    options: ['Computer Science', 'Information Technology', 'Automobile', 'Mechanical'],
  },
  {
    key: 'category',
    title: 'Category',
    options: ['Engineering', 'Arts & Science'],
  },
  {
    key: 'status',
    title: 'Status',
    options: ['Active', 'Inactive'],
  },
];

/* ADMIN FILTER UI */
export const ADMIN_FILTERS: FilterSection[] = [
  {
    key: 'plan',
    title: 'Select Plans',
    options: ['Basic', 'Pro', 'Enterprise', 'Premium'],
  },
  {
    key: 'status',
    title: 'Status',
    options: ['Active', 'Inactive'],
  },
];
