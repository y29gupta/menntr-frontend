// Used ONLY for category cards (listing)
export type CategoryListItem = {
  name: string;
  departments: number;
  students: number;
  head: string;
  code: string;
};

// Used ONLY for add/edit form
export type CategoryFormData = {
  name: string;
  code: string;
  assignedUserId: string;
  departments: string[];
};

export type UserOption = {
  id: string;
  name: string;
  department: string;
};
