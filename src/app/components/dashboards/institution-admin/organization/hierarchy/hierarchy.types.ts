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


export interface HierarchyCategory {
  index: number;
  departmentsCount: number;
}





export type User = {
  id: string
  name: string
  email: string
}

export type DepartmentNode = {
  id: string
  type: "department"
  name: string
  hod: User | null
}

export type CategoryNode = {
  id: string
  type: "category"
  name: string
  head: User | null
  children: DepartmentNode[]
}

export type InstitutionNode = {
  id: string
  type: "institution"
  name: string
  children: CategoryNode[]
}
