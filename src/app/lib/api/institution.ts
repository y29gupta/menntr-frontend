import axios from 'axios';
import { InstitutionFormValues } from '../institution';
import { PLAN_CODE_TO_ID } from '../institutions.api';
import { api } from '../api';

export const createInstitution = async (data: InstitutionFormValues) => {
  console.log(data,"sumi")
  const payload = {
    name: data.name,
    code: data.code,
    subdomain:data.subdomain,
    contact_email: data.contact_email,
    plan_id: PLAN_CODE_TO_ID[data.plan_id],
  };
  const res = await api.post(`/institution`, payload); // onboarding new institution 

  if (res.status == 201) {
    console.log(res.data,"data")
    const passData = {
      email: res.data.contact_email,
      institution_id:res.data.id
    }


    const institutionAdminResponse = await api.post('/institutions/admin', passData) //creating user institution admin
    if (institutionAdminResponse.status == 201) {
      console.log(institutionAdminResponse,"adminresponse")
      const emailpayload = {
        email: institutionAdminResponse.data.user.email,
        institution_id:institutionAdminResponse.data.user.institution_id
      }
      const response = await api.post(`/auth/invite`, emailpayload); // invite link email for complete institution password setup
      console.log(response,"email response")
      
    }
  
  }
  return res.data;
};
