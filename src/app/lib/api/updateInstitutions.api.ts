import { InstitutionFormValues } from '../institution';

export async function updateInstitution(id: string, data: InstitutionFormValues) {
  const res = await fetch(`/institutions/${id}`, {
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
