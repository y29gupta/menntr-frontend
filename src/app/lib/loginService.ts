import { api } from './api';

export async function loginUser(payload: any) {
  const res = await api.post('/auth/login', payload, {
    withCredentials: true, // 🔥 REQUIRED
  });
  return res.data;
}


export async function logout() {
  const res = await api.post('/auth/logout', {
    withCredentials: true, // 🔥 REQUIRED
  });
  return res.data;
}
