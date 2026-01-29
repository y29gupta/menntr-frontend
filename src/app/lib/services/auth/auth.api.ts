import { api } from '@/app/lib/api/client';

export const authApi = {
  login: (payload: any): Promise<any> => api.post('/auth/login', payload).then((res) => res.data),

  generateInvite: (payload: any): Promise<any> =>
    api.post('/auth/invite', payload).then((res) => res.data),

  consumeInvite: (payload: any): Promise<any> =>
    api.post('/auth/consume-invite', payload).then((res) => res.data),

  changePassword: (payload: any): Promise<any> =>
    api.post('/auth/change-password', payload).then((res) => res.data),
};
