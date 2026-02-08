export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    role: 'SUPER_ADMIN' | 'ADMIN' | 'INSTITUTION_ADMIN' | 'USER';
  };
}

export interface InviteConsumePayload {
  token: string;
  password: string;
}

export interface ResetPasswordPayload {
  email: string;
}

export interface ChangePasswordPayload {
  password: string;
}
