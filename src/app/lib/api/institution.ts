import axios from 'axios';
import { InstitutionFormValues } from '../institution';
import { PLAN_CODE_TO_ID } from '../institutions.api';

export const createInstitution = async (data: InstitutionFormValues) => {
  const payload = {
    name: data.name,
    code: data.code,
    contactEmail: data.contactEmail,
    planId: PLAN_CODE_TO_ID[data.plan],
  };

  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/institution`, payload);
  return res.data;
};
