export type BatchApiData = {
  id: number;
  name: string;
  category: string | null;
  department: {
    id: number;
    name: string;
  };
  coordinator?: {
    id: string;
    name: string;
  } | null;

  academic_year: string;
  students: number;
  status: 'Active' | 'Inactive';
};

export type PaginationMeta = {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
  pageSize: number;
};

export type BatchListResponse = {
  meta: PaginationMeta;
  data: BatchApiData[];
};

export interface Batch {
  id: number;
  name: string;
  department: {
    name: string;
    code: string;
  };
  category: string;
  faculties: string[];
  academicYear: string;
  students: number;
  status: 'Active' | 'Inactive';
}

export type CreateBatchPayload = {
  name: string;
  code: string;
  categoryRoleId: number;
  departmentRoleId: number;
  coordinatorId?: string | number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  sections: string[];
};

export type UpdateBatchVariables = {
  id: number;
  payload: Partial<CreateBatchPayload>;
};
