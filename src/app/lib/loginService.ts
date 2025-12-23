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

export async function validateResetToken(token: string, email: string) {
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

// export async function performLogout() {
//   try {
//     await logout();
//   } catch (error) {
//     console.error('Backend logout failed, continuing with local cleanup:', error);
//   } finally {
//     localStorage.clear();
//     sessionStorage.clear();

//     // window.location.href = '/login';
//   }
// }
