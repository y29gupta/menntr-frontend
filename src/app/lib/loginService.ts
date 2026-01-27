// import axios from 'axios';
// import { api } from './api';

// export async function loginUser(payload: any) {
//   const res = await api.post('/auth/login', payload, {
//     withCredentials: true,
//   });
//   return res.data;
// }

// export async function loginpasswordsetup(payload: any) {
//   console.log(payload,"payload")
//   const res = await axios.post('https://menntr-backend.onrender.com/auth/consume-invite', payload, {
//     withCredentials: true,
//   });
//   return res.data;
// }
// export async function validateForgotPassword(payload: any) {
//   const res = await api.post('/auth/forgot-password/validate', payload, {
//     withCredentials: true,
//   });
//   return res.data;
// }

// export async function sendForgotPassword(payload: any) {
//   const res = await api.post('/auth/forgot-password/send', payload, {
//     withCredentials: true,
//   });
//   return res.data;
// }

// export async function validateResetToken(token: string, email: string,) {
//   const res = await api.post(
//     '/auth/forgot-password/verify',
//     { token, email },
//     { withCredentials: true }
//   );
//   return res.data;
// }

// export async function resetPassword(payload: {
//   email: string;
//   token: string;
//   newPassword: string;
// }) {
//   const res = await api.post('/auth/forgot-password/reset', payload, {
//     withCredentials: true,
//   });
//   return res.data;
// }

// export async function logout() {
//   try {
//     const res = await api.post(
//       '/auth/logout',
//       {},
//       {
//         withCredentials: true,
//       }
//     );

//     return res.data;
//   } catch (error) {
//     console.error('Logout API call failed', error);
//     throw error;
//   }
// }

// export const adminPasswordSetup = ( payload: {
//     password: string;
//     confirmPassword: string;
//   },
//   setupToken: string) => {

//  const  sendPayload = {
//    confirmNewPassword: payload.confirmPassword,
//    newPassword:payload.password
//   }
//   return api.post(
//     '/auth/change-password',
//     sendPayload,
//     {
//       headers: {
//         Authorization: `Bearer ${setupToken}`,
//       },
//     }
//   );

//   // const passwordSetupResponse = api.post('/auth/change-password', sendPayload);

//   // return passwordSetupResponse
// };

import axios from 'axios';
import { api } from './api';
import { showApiError, showSuccess, toastApiPromise } from '@/app/ui/apiToast';

export async function loginUser(payload: any) {
  try {
    const res = await toastApiPromise(
      api.post('/auth/login', payload, {
        withCredentials: true,
      }),
      {
        pending: 'Logging in...',
        success: 'Login successful',
      }
    );
    return res.data;
  } catch (error: any) {
    showApiError(error);
    throw error;
  }
}

export async function loginpasswordsetup(payload: any) {
  try {
    console.log(payload, 'payload');
    const res = await toastApiPromise(
      api.post('/auth/consume-invite', payload, {
        withCredentials: true,
      }),
      {
        pending: 'Setting up password...',
        success: 'Password setup successful',
      }
    );
    return res.data;
  } catch (error: any) {
    showApiError(error);
    throw error;
  }
}

export async function validateForgotPassword(payload: any) {
  try {
    const res = await toastApiPromise(
      api.post('/auth/forgot-password/validate', payload, {
        withCredentials: true,
      }),
      {
        pending: 'Validating request...',
        success: 'Validation successful',
      }
    );
    return res.data;
  } catch (error: any) {
    showApiError(error);
    throw error;
  }
}

export async function sendForgotPassword(payload: any) {
  try {
    const res = await toastApiPromise(
      api.post('/auth/forgot-password/send', payload, {
        withCredentials: true,
      }),
      {
        pending: 'Sending reset email...',
        success: 'Password reset email sent',
      }
    );
    return res.data;
  } catch (error: any) {
    showApiError(error);
    throw error;
  }
}

export async function validateResetToken(token: string, email: string) {
  try {
    const res = await toastApiPromise(
      api.post('/auth/forgot-password/verify', { token, email }, { withCredentials: true }),
      {
        pending: 'Validating reset token...',
        success: 'Token validated',
      }
    );
    return res.data;
  } catch (error: any) {
    showApiError(error);
    throw error;
  }
}

export async function resetPassword(payload: {
  email: string;
  token: string;
  newPassword: string;
}) {
  try {
    const res = await toastApiPromise(
      api.post('/auth/forgot-password/reset', payload, {
        withCredentials: true,
      }),
      {
        pending: 'Resetting password...',
        success: 'Password reset successful',
      }
    );
    return res.data;
  } catch (error: any) {
    showApiError(error);
    throw error;
  }
}

export async function logout() {
  try {
    const res = await toastApiPromise(
      api.post(
        '/auth/logout',
        {},
        {
          withCredentials: true,
        }
      ),
      {
        pending: 'Logging out...',
        success: 'Logged out successfully',
      }
    );
    return res.data;
  } catch (error: any) {
    showApiError(error);
    throw error;
  }
}

export const adminPasswordSetup = (
  payload: {
    password: string;
    confirmPassword: string;
  },
  setupToken: string
) => {
  const sendPayload = {
    confirm_new_password: payload.confirmPassword,
    new_password: payload.password,
  };

  return toastApiPromise(
    api.post('/auth/change-password', sendPayload, {
      headers: {
        Authorization: `Bearer ${setupToken}`,
      },
    }),
    {
      pending: 'Changing password...',
      success: 'Password changed successfully',
    }
  ).catch((error: any) => {
    showApiError(error);
    throw error;
  });
};
