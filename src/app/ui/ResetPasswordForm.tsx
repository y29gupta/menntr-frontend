'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

import Buttons from './Button';
import ForgotPassword from '../components/icons/ForgotPassword';
import { resetPasswordSchema } from '../lib/loginSchema';
import { resetPassword } from '../lib/loginService';

type Values = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = ({ token }: { token: string }) => {
  const navigate = useRouter();

  const [done, setDone] = useState(false);
  const [role, setRole] = useState<string>('admin');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: Values) => {
    try {
      const params = new URLSearchParams(window.location.search);
      const email = params.get('email');
      if (!email) throw new Error('Missing email');

      const res = await resetPassword({
        email,
        token,
        newPassword: data.password,
      });

      // ✅ role from backend JSON
      const roleFromApi = res?.roles?.name || 'admin';
      setRole(roleFromApi);

      setDone(true);
      alert('Password reset successful');

      navigate.push(`/login?role=${roleFromApi}`);
    } catch (err) {
      console.log(err);
      alert('Reset failed');
    }
  };

 
  let imageSrc = '/assets/Admin.png';
  if (role === 'student') imageSrc = '/assets/HappyStudent.png';
  if (role === 'superadmin') imageSrc = '/assets/superadmin.png';

  return (
    <>
      <div className="bg-white w-full mx-auto flex flex-col justify-center items-start min-h-auto px-4 sm:px-6 lg:px-8 z-10 pb-4">
        <div className="flex flex-col w-full">
          <div className="w-full flex justify-start sm:justify-end sm:pr-10 md:pr-20 lg:pr-40 mb-4 lg:mb-0">
            <div className="relative max-w-full sm:max-w-lg rounded-full border border-[#E5E7EB] bg-white shadow-sm px-2 py-2">
              <span className="text-gray-700 text-sm sm:text-base pr-2">
                I want to level up my skills
              </span>
              <span
                className="px-2 sm:px-4 py-1 rounded-full text-xs font-medium text-[#3B82F6]
                bg-[linear-gradient(90deg,#F8FBFF_0%,#EEEBFF_100%)]
                shadow-sm ml-1 sm:ml-0"
              >
                Exactly. Let's begin
              </span>
            </div>
          </div>

          <div
            className="flex gap-2 mb-6 cursor-pointer hover:opacity-80 transition-opacity w-fit"
            onClick={() => navigate.push(`/login?role=${role}`)}
          >
            <img src={'Go-back.svg'} alt="Loading" />
            <p className="text-slate-900 text-[14px] sm:text-[16px] pt-4">Go back</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full bg-white items-start justify-between max-w-[1206px] gap-8 lg:gap-0">
          <div className="flex gap-3 sm:gap-5 bg-white min-h-auto w-full lg:w-auto">
            <div className="w-4px max-h-[100vh] bg-[#3B82F6] text-[#3B82F6]">|</div>

            <div className="flex-1 lg:flex-none">
              <div className="flex items-center gap-4 sm:gap-7 bg-white max-w-xs mb-6 sm:mb-8 rounded-3xl px-4 sm:px-5 shadow-[0px_0px_24px_0px_#0F172A40]">
                <img src={'vector.svg'} alt="loading" />
                <p className="text-[#0F172A] text-[16px] sm:text-[20px] font-semibold pt-4">
                  Reset Password
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-2 sm:space-y-4 bg-white p-4 sm:p-6 lg:p-8 rounded-2xl w-full min-w-full sm:min-w-lg mx-auto shadow-[0px_0px_16px_0px_#0F172A26]"
              >
                <p className="text-[#1A2C50] text-[14px] sm:text-[16px] font-semibold text-center">
                  Enter your new password
                </p>

                <div className="flex flex-col gap-4 sm:gap-5">
                  <div className="w-full">
                    <input
                      {...register('password')}
                      type="password"
                      placeholder="New Password"
                      className="w-full border-0 border-b border-gray-300 focus:border-blue-500 py-2 outline-none"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="w-full">
                    <input
                      {...register('confirmPassword')}
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full border-0 border-b border-gray-300 focus:border-blue-500 py-2 outline-none"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <ForgotPassword />
                  <p className="text-[#636771]">
                    {done
                      ? 'Password has been reset successfully'
                      : 'Make sure your password is strong'}
                  </p>
                </div>

                <div className="flex justify-center">
                  <Buttons role={role} status={isSubmitting} mode="reset" />
                </div>
              </form>
            </div>
          </div>

          <div className="hidden lg:block">
            <img
              src={imageSrc}
              alt="Loading"
              className="w-[370px] h-[400px] xl:w-[400px] xl:h-[400px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
