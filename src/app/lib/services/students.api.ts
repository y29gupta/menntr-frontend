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

  addAcademicDetails: (
  studentId: string,
  payload: { batch_id: number; roll_number: string,section_id:number }
) =>
  api.post(`/students/${studentId}/academic`, payload),

  
  getEnrollmentMeta: async () => {
    const res = await api.get('/students/enrollment/meta');
    return res.data;
  },

  addEnrollmentDetails: (
    studentId: string,
    payload: {
      admission_type: string;
      enrollment_status: string;
      joining_date: string;
    }
  ) => {
    return api.post(`/students/${studentId}/enrollment`, payload);
  },
  // ----------------------platform access ------------------
  getPlatformAccess: async (studentId: string) => {
  const res = await api.get(`/students/${studentId}/platform-access`);
    return res.data;
    
  },
  

updatePlatformAccess: (
  studentId: string,
  payload: {
    login_enabled: boolean;
    assessment_enabled: boolean;
    result_view_enabled: boolean;
  }
) => {
  return api.post(`/students/${studentId}/platform-access`, payload);
  },

  
    SaveAdditionalInfo: async (studentId: string, payload: {
        guardian_name?: string,
    guardian_contact?:string,
    notes?:string
    }) => {
      const res = await api.post(`/students/${studentId}/additional-info`,payload)
      return res.data;
    }

};

export const getPrograms = async () => {
  const res = await api.get('/students/academic/meta');
  return res.data.programs;
};

export const getDepartments = async (programId: string) => {
  const res = await api.get(
    `/students/academic/meta/departments?category_role_id=${programId}`
  );
  return res.data.departments;
};

export const getBatches = async (departmentId: string) => {
  const res = await api.get(
    `/students/academic/meta/batches?department_role_id=${departmentId}`
  );
  return res.data.batches;
};

