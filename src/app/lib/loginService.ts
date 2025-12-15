import { api } from './api';

export async function loginUser(payload: any) {
  const res = await api.post('/auth/login', payload);
  return res.data;
}
