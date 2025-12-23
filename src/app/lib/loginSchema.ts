import { email, z } from 'zod';

export const baseSchema = {
  email: z.string().nonempty('Email is required').email('Enter a valid email'),

  password: z.string().nonempty('Password is required'),
};

export const studentAdminSchema = z.object({
  institutionCode: z.string().nonempty('Institution code is required'),

  ...baseSchema,
});

export const superAdminSchema = z.object({
  ...baseSchema,
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
export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;
export type ResetPassword = z.infer<typeof resetPasswordSchema>;
