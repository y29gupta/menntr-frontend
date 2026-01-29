import { email, z } from 'zod';

export const baseSchema = {
  email: z.string().nonempty('Email is required').email('Enter a valid email'),

  password: z.string().nonempty('Password is required'),
};

export const studentAdminSchema = z.object({
  institution_code: z.string().nonempty('Institution code is required'),

  ...baseSchema,
});

export const superAdminSchema = z.object({
  ...baseSchema,
});

export const setPasswordSchema = z.object({
  password: z.string().nonempty('Password is required'),
  confirmPassword: z.string().nonempty('Confirm password is required'),
});
export const forgotPasswordSchema = z.object({
  email: z.string().nonempty('Email is required').email('Enter a valid email'),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().nonempty('Password is required'),
    confirmPassword: z.string().nonempty('Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type StudentAdminLogin = z.infer<typeof studentAdminSchema>;
export type SuperAdminLogin = z.infer<typeof superAdminSchema>;

export type SetPasswordForm = z.infer<typeof setPasswordSchema>;
export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;
export type ResetPassword = z.infer<typeof resetPasswordSchema>;
