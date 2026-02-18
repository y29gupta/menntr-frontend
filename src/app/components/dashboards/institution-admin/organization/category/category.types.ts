// Used ONLY for category cards (listing)
export type CategoryListItem = {
  id: number;
  name: string;
  departments: number;
  students: number;
  head: string; // Display name in UI
  code: string;
};

// API response item
export interface CategoryApiItem {
  id: number;
  name: string;
  code: string;
  departmentCount: number;

  // Single assigned user
  assigned_user: {
    id: string;
    name: string;
    email: string;
  } | null;

  // Kept only if backend still returns it
  head?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

// Used ONLY for add/edit form
export type CategoryFormData = {
  id?: string;
  name: string;
  code: string;
  assignedUserId: string; // Used in form (string for dropdown)
};

export type UserOption = {
  id: string;
  name: string;
  department: string;
};

export type CategoryMetaResponse = {
  users: {
    id: string;
    name: string;
    email: string;
  }[];
  departments: {
    id: string;
    name: string;
    categoryId: string | null;
    isAssigned: boolean;
  }[];
};

export interface DepartmentMetaResponse {
  categories: {
    id: string;
    name: string;
  }[];
  hodUsers: {
    id: string;
    name: string;
    email: string;
  }[];
}

export type CreateCategoryPayload = {
  name: string;
  code: string;
  assigned_user_id: number; // ✅ Backend expects number
};
