import { api } from '../api';

export type StudentApi = {
  id: string;
  studentName: string;
  email: string;
  rollNumber: string;
  category: string;
  department: string;
  batch: string;
  section: string;
  assessmentsTaken: number;
  averageScore: number | null;
  status: 'active' | 'inactive';
  lastLogin: string;
};

export type StudentListResponse = {
  total: number;
  page: number;
  limit: number;
  students: StudentApi[];
};

export async function fetchStudents(params: {
  page: number;
  limit: number;
  filters?: Record<string, string>;
}): Promise<StudentListResponse> {
  const res = await api.get('/students');
  return res.data;
}
