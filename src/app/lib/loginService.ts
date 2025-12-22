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

export async function logout() {
  const res = await api.post('/auth/logout', {
    withCredentials: true,
  });
  return res.data;
}
