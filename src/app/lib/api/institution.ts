import { api } from '../api';
import { InstitutionFormValues } from '../institution';

export const createInstitution = async (data: InstitutionFormValues) => {
  const res = await api.post('/institution', data);
  return res.data;
};
