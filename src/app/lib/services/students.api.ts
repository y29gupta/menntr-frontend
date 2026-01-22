// import { api } from "../api";

import { StudentApi } from "@/app/components/dashboards/institution-admin/student-management/student.types";
import { api } from "../api";


// export type StudentApi = {
//   id: string;
//   studentName: string;
//   email: string;
//   rollNumber: string;
//   category: string;
//   department: string;
//   batch: string;
//   section: string;
//   assessmentsTaken: number;
//   averageScore: number | null;
//   status: 'active' | 'inactive';
//   lastLogin: string;
// };

// export type StudentListResponse = {
//   total: number;
//   page: number;
//   limit: number;
//   students: StudentApi[];
// };

// export async function fetchStudents(params: {
//   page: number;
//   limit: number;
//   filters?: Record<string, string>;
// }): Promise<StudentListResponse> {
//   const res = await api.get('/students');
//   return res.data;
// }


export type StudentListResponse = {
  data: StudentApi[];
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
    currentPageCount: number;
  };
};

export async function fetchStudents(params: {
  page: number;
  filters: Record<string, string>;
}) {
  // SAME endpoint, SAME params
  const res = await api.get('/students', { params });
  return res.data as StudentListResponse;
}
