import axios from 'axios';
import { InstitutionFormValues } from '../institution';
import { PLAN_CODE_TO_ID } from '../institutions.api';
import { api } from '../api';

export const createInstitution = async (data: InstitutionFormValues) => {
  const payload = {
    name: data.name,
    code: data.code,
    subdomain:data.subDomain,
    contactEmail: data.contactEmail,
    planId: PLAN_CODE_TO_ID[data.plan],
  };
  const res = await api.post(`/institution`, payload); // onboarding new institution 

  if (res.status == 201) {
    console.log(res.data,"data")
    const passData = {
      email: res.data.contactEmail,
      institutionId:res.data.id
    }


    const institutionAdminResponse = await api.post('/institutions/admin', passData) //creating user institution admin
    if (institutionAdminResponse.status == 201) {
      console.log(institutionAdminResponse,"adminresponse")
      const emailpayload = {
        email: institutionAdminResponse.data.user.email,
        institutionId:institutionAdminResponse.data.user.institutionId
      }
      const response = await api.post(`/auth/invite`, emailpayload); // invite link email for complete institution password setup
      console.log(response,"email response")
      
    }
  
  }
  return res.data;
};
