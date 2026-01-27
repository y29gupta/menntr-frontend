export const ROLE_CONFIG = {
  categories: {
    Engineering: ['Mechanical', 'ECE', 'CSE', 'Civil'],
    Agriculture: ['Horticulture', 'Agronomy'],
  },
  batches: ['2020', '2021', '2022', '2023'],
} as const;

export type CategoryKey = keyof typeof ROLE_CONFIG.categories;
