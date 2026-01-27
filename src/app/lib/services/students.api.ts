import { CreateStudentPayload, StudentFormValues, StudentListResponse } from "@/app/components/dashboards/institution-admin/student-management/student.types";
import { api } from "@/app/lib/api";


type StudentQueryParams = {
  page: number;
  limit: number;
  search?: string;
  filters?: Record<string, string>;
};

export const studentsApi = {
  getStudents: async ({
    page,
    limit,
    search,
    filters = {},
  }: StudentQueryParams): Promise<StudentListResponse> => {
    const params: Record<string, string | number> = {
      page,
      limit,
    };

    if (search) {
      params.search = search;
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params[key] = value;
      }
    });

    const { data } = await api.get('/students', {
      params,
    });

    return data;
  },
  
 
  createStudent: (data: StudentFormValues) => {
    const payload: CreateStudentPayload = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      roll_number: data.rollNumber,
    };

    return api.post('/students', payload);
  },
};
