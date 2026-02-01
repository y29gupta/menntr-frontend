// Used ONLY for category cards (listing)
export type CategoryListItem = {
  name: string;
  departments: number;
  students: number;
  head: string;
  code: string;
};



export interface CategoryApiItem {
  id: number;
  name: string;
  code: string;
  departmentCount: number;
  assignedUsers: {
    id: string;
    name: string;
    email: string;
  }[];
  head: {
    id: string;
    name: string;
    email: string;
  } | null; // For backward compatibility
}


// Used ONLY for add/edit form
export type CategoryFormData = {
  id?: string;
  name: string;
  code: string;
  programs?: Array<{ program_code: string; program_name: string }>;
  // assignedUserId and departments removed - users can be assigned separately
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

export type DepartmentMetaResponse = {
  hodUsers: {
    id: string;
    name: string;
    email: string;
  }[];
  categories: {
    id: string;
    name: string;
    // categoryId: string | null;
    // isAssigned: boolean;
  }[];
};


export type CreateCategoryPayload = {
  name: string;
  code: string;
  programs?: Array<{ program_code: string; program_name: string }>;
  // headUserId and departmentIds removed
};

export type Program = {
  id: number;
  program_code: string;
  program_name: string;
  category_role_id?: number;
};
