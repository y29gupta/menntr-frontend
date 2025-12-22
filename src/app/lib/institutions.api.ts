// Backend institution (API response item)
import { InstitutionFormValues } from '@/app/lib/institution';
export type InstitutionApi = {
  id: number;
  name: string;
  code: string;
  contactEmail?: string;
  status: string;
  planId: number;
  createdAt?: string;
  plan: {
    id: number;
    name: string;
    code: string;
  };
};

// API response shape
export type InstitutionApiResponse = {
  count: number;
  data: InstitutionApi[];
};

// UI model (what DataTable expects)
export type Institution = {
  id: number;
  name: string;
  code: string;
  plan: string;
  students: string;
  status: string;
};

export async function fetchInstitutions(): Promise<InstitutionApiResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/institutions`, {
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
    plan: item.plan?.name,
    contactEmail:item.contactEmail,
    students: '—',
    status: item.status,
  }));
}




export async function updateInstitution(
  id: number | string,
  payload: InstitutionFormValues
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/institutions/${id}`,
    {
      method: 'PUT', // or PATCH (backend dependent)
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: payload.name,
        code: payload.code,
        contactEmail: payload.contactEmail,
        plan: payload.plan, // BASIC / PREMIUM
      }),
    }
  );

  if (!res.ok) {
    throw new Error('Failed to update institution');
  }

  return res.json();
}
