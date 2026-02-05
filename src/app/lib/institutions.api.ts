import { InstitutionFormValues } from '@/app/lib/institution';
import { api } from './api';
import { toastApiPromise, showApiError } from '@/app/ui/apiToast';
import {
  CreateDepartmentPayload,
  DepartmentApiResponse,
  UpdateDepartmentPayload,
} from '../components/dashboards/institution-admin/organization/department/department.column';
import {
  CategoryApiItem,
  CategoryMetaResponse,
  CreateCategoryPayload,
  DepartmentMetaResponse,
} from '../components/dashboards/institution-admin/organization/category/category.types';

export const PLAN_CODE_TO_ID = {
  BASIC: 1,
  PREMIUM: 4,
} as const;

export const PLAN_ID_TO_CODE = {
  1: 'BASIC',
  4: 'PREMIUM',
} as const;

export type PlanCode = keyof typeof PLAN_CODE_TO_ID;
export type PlanId = (typeof PLAN_CODE_TO_ID)[PlanCode];

/* ===================== API TYPES ===================== */

export type InstitutionApi = {
  id: number;
  name: string;
  code: string;
  contact_email: string;
  status: string;

  studentCount: number;

  planId?: number;
  createdAt?: string;
  plan: {
    id: number;
    name: string;
    code: string;
  };
};

export type InstitutionApiResponse = {
  data: InstitutionApi[];
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

/* ===================== UI TYPE ===================== */

export type Institution = {
  id: number;
  name: string;
  code: string;
  plan: string;
  contactEmail: string;

  students: string;

  status: string;
  planId: number;
};

export type FilterParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  code?: string;
  contactEmail?: string;
  planCode?: string;
  name?: string;
};

/* ===================== FETCH ===================== */

export async function fetchInstitutions(
  filters: FilterParams = {}
): Promise<InstitutionApiResponse> {
  const queryParams = new URLSearchParams();

  if (filters.page) queryParams.append('page', String(filters.page));
  if (filters.limit) queryParams.append('limit', String(filters.limit));
  if (filters.search) queryParams.append('search', filters.search);
  if (filters.status) queryParams.append('status', filters.status);
  if (filters.code) queryParams.append('code', filters.code);
  if (filters.contactEmail) queryParams.append('contactEmail', filters.contactEmail);
  if (filters.planCode) queryParams.append('planCode', filters.planCode);
  if (filters.name) queryParams.append('name', filters.name);

  const url = `/api/institutions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to fetch institutions');

  return res.json();
}

/* ===================== MAPPER (KEY FIX) ===================== */

export function mapInstitutions(apiData: InstitutionApi[]): Institution[] {
  return apiData.map((item) => ({
    id: item.id,
    name: item.name,
    code: item.code,
    plan: item.plan?.name ?? '—',
    contactEmail: item.contact_email,

    students: String(item.studentCount ?? 0),

    status: item.status,
    planId: item.plan?.id || 1,
  }));
}

/* ===================== UPDATE INSTITUTION ===================== */

export async function updateInstitution(id: number | string, payload: InstitutionFormValues) {
  try {
    return await toastApiPromise(
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/institutions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: payload.name,
          code: payload.code,
          contactEmail: payload.contact_email,
          planId: PLAN_CODE_TO_ID[payload.plan_id as PlanCode],
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update institution');
        }
        return res.json();
      }),
      {
        pending: 'Updating institution...',
        success: 'Institution updated successfully',
      }
    );
  } catch (error) {
    showApiError(error);
    throw error;
  }
}

/* ----------------------- categories api ---------------------------------------- */

export const getCategories = async (institutionId: string): Promise<CategoryApiItem[]> => {
  const res = await api.get(`/organization/categories`);
  return res.data;
};

export const getCategoryMeta = async (): Promise<CategoryMetaResponse> => {
  const res = await api.get(`/organization/categories/meta`);
  return res.data;
};

export const createCategory = async (payload: CreateCategoryPayload) => {
  try {
    const res = await toastApiPromise(api.post('/organization/categories', payload), {
      pending: 'Creating category...',
      success: 'Category created successfully',
    });
    return res.data;
  } catch (error) {
    showApiError(error);
    throw error;
  }
};

export const getCategoryById = async (categoryId: string) => {
  const res = await api.get(`/organization/categories/${categoryId}`);
  return res.data;
};

export const updateCategory = async (categoryId: string, payload: CreateCategoryPayload) => {
  try {
    const res = await toastApiPromise(api.put(`/organization/categories/${categoryId}`, payload), {
      pending: 'Updating category...',
      success: 'Category updated successfully',
    });
    return res.data;
  } catch (error) {
    showApiError(error);
    throw error;
  }
};

/* ----------------------------- department api -------------------------------- */

export const getDepartments = async (): Promise<DepartmentApiResponse> => {
  const res = await api.get(`/organization/departments`);
  return res.data;
};

export const getDepartmentMeta = async (): Promise<DepartmentMetaResponse> => {
  const res = await api.get(`/organization/departments/meta`);
  return res.data;
};

export const createDepartment = async (payload: CreateDepartmentPayload) => {
  try {
    const res = await toastApiPromise(api.post('/organization/departments', payload), {
      pending: 'Creating department...',
      success: 'Department created successfully',
    });
    return res.data;
  } catch (error) {
    showApiError(error);
    throw error;
  }
};

export const updateDepartment = async (id: number, payload: UpdateDepartmentPayload) => {
  try {
    const res = await toastApiPromise(api.put(`/organization/departments/${id}`, payload), {
      pending: 'Updating department...',
      success: 'Department updated successfully',
    });
    return res.data;
  } catch (error) {
    showApiError(error);
    throw error;
  }
};

/* ----------------------------- hierarchy api -------------------------------- */

export type HierarchyApiNode = {
  id: string;
  name: string;
  roleHierarchyId: number;
  children?: HierarchyApiNode[];
};

export type HierarchyApiResponse = {
  institution: HierarchyApiNode;
};

export const getHierarchy = async (): Promise<HierarchyApiResponse> => {
  const res = await api.get('/organization/hierarchy');
  return res.data;
};

/* ----------------------------- programs api -------------------------------- */

export type Program = {
  id: number;
  program_code: string;
  program_name: string;
  category_role_id?: number;
};

export const getPrograms = async (category_role_id?: number): Promise<Program[]> => {
  const params = category_role_id ? { category_role_id } : {};
  const res = await api.get('/organization/programs', { params });
  return res.data;
};

export const createProgram = async (payload: {
  category_role_id: number;
  program_code: string;
  program_name: string;
}) => {
  try {
    const res = await toastApiPromise(api.post('/organization/programs', payload), {
      pending: 'Creating program...',
      success: 'Program created successfully',
    });
    return res.data;
  } catch (error) {
    showApiError(error);
    throw error;
  }
};
