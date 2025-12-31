export const ROLE_CONFIG = {
  hierarchy: {
    'Institution Admin': { showCategories: false, showDepartment: false, showBatch: false },
    'Category Admin': { showCategories: true, showDepartment: false, showBatch: false },
    'Placement Officer': { showCategories: true, showDepartment: false, showBatch: false },
    'Department Admin (HOD)': { showCategories: true, showDepartment: true, showBatch: true },
    Faculty: { showCategories: true, showDepartment: true, showBatch: true },
  },
  categories: {
    Engineering: ['Mechanical', 'ECE', 'CSE', 'Civil'],
    Agriculture: ['Horticulture', 'Agronomy'],
  },
  batches: ['2020', '2021', '2022', '2023'],
} as const;

export type RoleKey = keyof typeof ROLE_CONFIG.hierarchy;
export type CategoryKey = keyof typeof ROLE_CONFIG.categories;
