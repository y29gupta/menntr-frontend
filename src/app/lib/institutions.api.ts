import { InstitutionFormValues } from '@/app/lib/institution';
import { api } from './api';
import { CategoryApiItem, CategoryMetaResponse, CreateCategoryPayload } from '../components/dashboards/institution-admin/category/category.types';

export const PLAN_CODE_TO_ID = {
  BASIC: 1,
  PREMIUM: 4,
} as const;

export const PLAN_ID_TO_CODE = {
  1: 'BASIC',
  4: 'PREMIUM',
} as const;

// export type CreateCategoryPayload = {
//   name: string;
//   code: string;
//   headId: string;
//   departmentIds: string[];
// };

export type PlanCode = keyof typeof PLAN_CODE_TO_ID;
export type PlanId = (typeof PLAN_CODE_TO_ID)[PlanCode];

export type InstitutionApi = {
  id: number;
  name: string;
  code: string;
  contactEmail: string;
  status: string;
  planId: number;
  createdAt?: string;
  plan: {
    id: number;
    name: string;
    code: string;
  };
};

// API response
export type InstitutionApiResponse = {
  count: number;
  data: InstitutionApi[];
};

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

// export async function fetchInstitutions(): Promise<InstitutionApiResponse> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/institutions`, {
//     method: 'GET',
//     credentials: 'include',
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch institutions');
//   }

//   return res.json();
// }

export async function fetchInstitutions(): Promise<InstitutionApiResponse> {
  const res = await api.get(`/institutions`);

  if (!res.data) {
    throw new Error('Failed to fetch institutions');
  }

  return res.data;
}

export function mapInstitutions(apiData: InstitutionApi[]): Institution[] {
  return apiData.map((item) => ({
    id: item.id,
    name: item.name,
    code: item.code,
    plan: item.plan?.name ?? '—',
    contactEmail: item.contactEmail,
    students: '—',
    status: item.status,
    planId: item.planId,
  }));
}

export async function updateInstitution(id: number | string, payload: InstitutionFormValues) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/institutions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',

    body: JSON.stringify({
      name: payload.name,
      code: payload.code,
      contactEmail: payload.contactEmail,
      planId: PLAN_CODE_TO_ID[payload.plan],
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to update institution');
  }

  return res.json();
}


// institution admin api

export const getCategories = async (
  institutionId: string
): Promise<CategoryApiItem[]> => {
  const res = await api.get(`/organization/categories`);
  return res.data;
};

// institutions.api.ts

export const getCategoryMeta = async (): Promise<CategoryMetaResponse> => {
  const res = await api.get(`/organization/categories/meta`);
  return res.data;
};

export const createCategory = async (payload: CreateCategoryPayload) => {
  console.log(payload,"payload")
  const res = await api.post('/organization/categories', payload);
  return res.data;
};

export const updateCategory = async (
  categoryId: string,
  payload: CreateCategoryPayload
) => {
  const res = await api.put(`/organization/categories/${categoryId}`, payload);
  return res.data;
};