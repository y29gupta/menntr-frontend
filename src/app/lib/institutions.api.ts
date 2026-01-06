import { InstitutionFormValues } from '@/app/lib/institution';

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

export type InstitutionApi = {
  id: number;
  name: string;
  code: string;
  contactEmail: string;
  status: string;
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

export async function fetchInstitutions(filters: FilterParams = {}): Promise<InstitutionApiResponse> {
  const queryParams = new URLSearchParams();

  if (filters.page) queryParams.append('page', String(filters.page));
  if (filters.limit) queryParams.append('limit', String(filters.limit));
  if (filters.search) queryParams.append('search', filters.search);
  if (filters.status) queryParams.append('status', filters.status);
  if (filters.code) queryParams.append('code', filters.code);
  if (filters.contactEmail) queryParams.append('contactEmail', filters.contactEmail);
  if (filters.planCode) queryParams.append('planCode', filters.planCode);
  if (filters.name) queryParams.append('name', filters.name);

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/institutions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch institutions');
  }

  return res.json();
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
    planId: item.plan?.id || 1,
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