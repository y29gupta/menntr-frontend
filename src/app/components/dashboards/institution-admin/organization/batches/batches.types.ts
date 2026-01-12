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
  academicYear: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

export type UpdateBatchVariables = {
  id: number;
  payload: Partial<CreateBatchPayload>;
};
