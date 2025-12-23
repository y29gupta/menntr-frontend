import { api } from '../api';
import { InstitutionFormValues } from '../institution';

export const createInstitution = async (data: InstitutionFormValues) => {
    console.log(data,"got the data")
  const res = await api.post('/institutions', data);
  return res.data;
};
