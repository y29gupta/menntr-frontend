import { InstitutionFormValues } from '../institution';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL_HOST;

export async function updateInstitution(id: string, data: InstitutionFormValues) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/institutions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || 'Failed to update institution');
  }

  return res.json();
}
