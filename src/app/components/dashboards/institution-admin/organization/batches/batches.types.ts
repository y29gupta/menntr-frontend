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
