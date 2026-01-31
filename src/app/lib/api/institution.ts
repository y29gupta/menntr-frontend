import axios from 'axios';
import { InstitutionFormValues } from '../institution';
import { api } from '../api';
import { plansApi } from './plans.api';

// Helper function to get plan ID from plan code
const getPlanIdFromCode = async (planCode: string): Promise<number | null> => {
  try {
    const plansResponse = await plansApi.getPlans();
    const plan = plansResponse.data.find((p) => p.code.toUpperCase() === planCode.toUpperCase());
    return plan?.id || null;
  } catch (error) {
    console.error('Failed to fetch plans:', error);
    return null;
  }
};

export const createInstitution = async (data: InstitutionFormValues) => {
  console.log(data, 'sumi');
  
  // Get plan ID from plan code
  const planId = await getPlanIdFromCode(data.plan_id);
  if (!planId) {
    throw new Error(`Plan with code "${data.plan_id}" not found`);
  }
  
  const payload = {
    name: data.name,
    code: data.code,
    subdomain: data.subdomain,
    contact_email: data.contact_email,
    plan_id: planId,
  };
  const res = await api.post(`/institution`, payload); // onboarding new institution

  if (res.status == 201) {
    console.log(res.data, 'data');
    const passData = {
      email: res.data.contact_email,
      institution_id: res.data.id,
    };

    const institutionAdminResponse = await api.post('/institutions/admin', passData); //creating user institution admin
    if (institutionAdminResponse.status == 201) {
      console.log(institutionAdminResponse, 'adminresponse');
      const emailpayload = {
        email: institutionAdminResponse.data.user.email,
        institution_id: institutionAdminResponse.data.user.institution_id,
      };
      const response = await api.post(`/auth/invite`, emailpayload); // invite link email for complete institution password setup
      console.log(response, 'email response');
    }
  }
  return res.data;
};
