export interface StudentApi {
  id: string;
  studentName: string;
  email: string;
  rollNumber: string;
  category: string;
  department: string;
  batch: string;
  assessmentsTaken: number;
  status: 'active' | 'inactive';
  lastLogin: string;
}

export interface StudentMeta {
  totalCount: number;
  currentPage: number;
  pageCount: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  nextPage?: number | null;
  previousPage?: number | null;
}

export interface StudentListResponse {
  meta: StudentMeta;
  data: StudentApi[];
}
