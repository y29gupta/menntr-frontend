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
