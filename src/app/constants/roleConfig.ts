// Type for role rules
export interface RoleRules {
  showCategories: boolean;
  showDepartment: boolean;
  showBatch: boolean;
}

// Default rules mapping for roles fetched from API
export const getRoleRules = (roleName: string): RoleRules => {
  const rulesMap: Record<string, RoleRules> = {
    'Institution Admin': { showCategories: false, showDepartment: false, showBatch: false },
    'Category Admin': { showCategories: true, showDepartment: false, showBatch: false },
    'Placement Officer': { showCategories: true, showDepartment: false, showBatch: false },
    'Department Admin': { showCategories: true, showDepartment: true, showBatch: true },
    'Department Admin (HOD)': { showCategories: true, showDepartment: true, showBatch: true },
    Faculty: { showCategories: true, showDepartment: true, showBatch: true },
    Student: { showCategories: false, showDepartment: false, showBatch: false },
  };

  // Return matching rules or default to all false
  return rulesMap[roleName] || { showCategories: false, showDepartment: false, showBatch: false };
};

export const ROLE_CONFIG = {
  categories: {
    Engineering: ['Mechanical', 'ECE', 'CSE', 'Civil'],
    Agriculture: ['Horticulture', 'Agronomy'],
  },
  batches: ['2020', '2021', '2022', '2023'],
} as const;

export type CategoryKey = keyof typeof ROLE_CONFIG.categories;