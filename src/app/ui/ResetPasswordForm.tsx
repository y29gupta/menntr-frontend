'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { resetPasswordSchema } from '@/app/lib/loginSchema';
import { resetPassword } from '@/app/lib/loginService';

const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const params = new URLSearchParams(window.location.search);
      const email = params.get('email');

      if (!email) throw new Error('Missing email');

      await resetPassword({
        email,
        token,
        newPassword: data.password,
      });

      alert('Password reset successful');
      router.push('/login');
    } catch {
      alert('Reset failed');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow w-full max-w-md mx-auto">
      <p className="text-center text-lg font-semibold mb-4">Enter your new password</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('password')}
          placeholder="New Password"
          type="password"
          className="w-full border-b border-gray-300 py-2 outline-none"
        />
        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

        <input
          {...register('confirmPassword')}
          placeholder="Confirm Password"
          type="password"
          className="w-full border-b border-gray-300 py-2 outline-none"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
        )}

        <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 rounded-md">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
