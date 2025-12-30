import { api } from './api';

export async function loginUser(payload: any) {
  const res = await api.post('/auth/login', payload, {
    withCredentials: true,
  });
  return res.data;
}

export async function validateForgotPassword(payload: any) {
  const res = await api.post('/auth/forgot-password/validate', payload, {
    withCredentials: true,
  });
  return res.data;
}

export async function sendForgotPassword(payload: any) {
  const res = await api.post('/auth/forgot-password/send', payload, {
    withCredentials: true,
  });
  return res.data;
}

export async function validateResetToken(token: string, email: string,) {
  const res = await api.post(
    '/auth/forgot-password/verify',
    { token, email },
    { withCredentials: true }
  );
  return res.data;
}

export async function resetPassword(payload: {
  email: string;
  token: string;
  newPassword: string;
}) {
  const res = await api.post('/auth/forgot-password/reset', payload, {
    withCredentials: true,
  });
  return res.data;
}

export async function logout() {
  try {
    const res = await api.post(
      '/auth/logout',
      {},
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.error('Logout API call failed', error);
    throw error;
  }
}


export const adminPasswordSetup = (payload: {
  password: string;
  confirmPassword: string;
}) => {

 const  sendPayload = {
   confirmNewPassword: payload.confirmPassword,
   newPassword:payload.password
  }
  console.log("payload",payload.confirmPassword)
  const passwordSetupResponse = api.post('/auth/change-password', sendPayload);
  console.log(passwordSetupResponse, "passsword setup response")
  return passwordSetupResponse
};
