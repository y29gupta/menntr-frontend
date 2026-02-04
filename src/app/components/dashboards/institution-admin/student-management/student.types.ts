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


//student form 
export type StudentFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rollNumber: string;
  gender: 'male' | 'female' | 'other'; 
  batchId?: number;

};

// student-management/student.types.ts
import { z } from 'zod';
export const studentFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone is required'),
  gender: z.enum(['male', 'female', 'other']),
  rollNumber: z.string().min(1, 'Roll number is required'),
});

/* backend payload type */
export type CreateStudentPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  roll_number: string;
};

