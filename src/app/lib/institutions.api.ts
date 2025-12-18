// Backend institution (API response item)
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL_HOST}/institutions`, {
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
    students: '—',
    status: item.status,
  }));
}
