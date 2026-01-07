'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { adminPasswordSetup, loginUser } from '@/app/lib/loginService';

import Buttons from './Button';
import {
  studentAdminSchema,
  superAdminSchema,
  setPasswordSchema,
  StudentAdminLogin,
  SuperAdminLogin,
  SetPasswordForm,
} from '@/app/lib/loginSchema';

import { ROLE_REDIRECT } from '../lib/roles';

type LoginFormValues = StudentAdminLogin | SuperAdminLogin;
// type LoginFormValues = StudentAdminLogin | SuperAdminLogin | SetPasswordForm;

type LoginFormProps = {
  role: string;
  setupToken?: string | null;
};

const Loginform = ({ role, setupToken }: LoginFormProps) => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const expectedRole = searchParams.get('role');
  console.log(expectedRole, 'role');

  const params = useParams();
  const slug = params?.slug as string[] | undefined;
  const isOneTimeLogin = slug?.[0] === 'one-time-login';
  console.log(params, 'slug');

  // const token = searchParams.get('token') || '';
  // const setupEmail = searchParams.get('email') || '';

  const isSuperAdmin = role === 'Super Admin';

  let imageSrc = '/assets/Admin.png';
  if (role === 'student') imageSrc = '/assets/HappyStudent.png';
  if (role === 'Super Admin') imageSrc = '/assets/superadmin.png';
  const resolver = isOneTimeLogin
    ? zodResolver(setPasswordSchema)
    : zodResolver(isSuperAdmin ? superAdminSchema : studentAdminSchema);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    // resolver: zodResolver(isSuperAdmin ? superAdminSchema : studentAdminSchema),
    resolver,
  });

  const onSubmit = async (data: any) => {
    try {
      if (isOneTimeLogin) {
        console.log('one time', slug);
        if (data.password !== data.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        if (!setupToken) {
          alert('Invalid or expired setup token');
          return;
        }

        const setup = await adminPasswordSetup(
          {
            // token,
            // email: setupEmail,
            password: data.password,
            confirmPassword: data.confirmPassword,
          },
          setupToken
        );
        if (setup) {
          navigate.push('/');
          return;
        }
      }

      const res = await loginUser({ ...data });
      console.log(res, 'resp');
      if (res.status == true) {
        console.log('true');
        const redirectPath = ROLE_REDIRECT[expectedRole as keyof typeof ROLE_REDIRECT];
        console.log(redirectPath, 'path');

        navigate.push(redirectPath);
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || err.message || 'Action failed');
    }
  };

  return (
    <>
      <div className="bg-white w-full mx-auto flex flex-col justify-center items-start min-h-auto px-4 sm:px-6 lg:px-8 z-10 pb-4">
        {/* TOP CTA */}
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

          {role !== 'superadmin' && (
            <div
              className="flex gap-2 mb-6 cursor-pointer hover:opacity-80 transition-opacity w-fit"
              onClick={() => navigate.push('/')}
            >
              <img src={'/Go-back.svg'} alt="Loading" />
              <p className="text-slate-900 text-[14px] sm:text-[16px] pt-4">Go back</p>
            </div>
          )}
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col lg:flex-row w-full bg-white items-start justify-between max-w-[1206px] gap-8 lg:gap-0">
          <div className="flex gap-3 sm:gap-5 bg-white min-h-auto w-full lg:w-auto">
            <div className="w-4px max-h-[100vh] bg-[#3B82F6] text-[#3B82F6]">|</div>

            <div className="flex-1 lg:flex-none">
              {/* HEADER */}
              <div className="flex items-center gap-4 sm:gap-7 bg-white max-w-xs mb-6 sm:mb-8 rounded-3xl px-4 sm:px-5 shadow-[0px_0px_24px_0px_#0F172A40]">
                <img src={'/vector.svg'} alt="loading" />
                {/* <p className="text-[#0F172A] text-[16px] sm:text-[20px] font-semibold pt-4">
                  {role === 'student'
                    ? 'Student Login'
                    : role === 'superadmin'
                      ? 'Super Admin Login'
                      : 'Admin Login'}
                </p> */}
                <p className="text-[#0F172A] text-[16px] sm:text-[20px] font-semibold pt-4">
                  {isOneTimeLogin
                    ? 'Institution Admin Setup'
                    : role === 'student'
                      ? 'Student Login'
                      : role === 'Super Admin'
                        ? 'Super Admin Login'
                        : 'Admin Login'}
                </p>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 lg:p-8 rounded-2xl w-full min-w-full sm:min-w-lg mx-auto shadow-[0px_0px_16px_0px_#0F172A26]"
              >
                {/* <p className="text-[#1A2C50] text-[14px] sm:text-[16px] font-semibold text-center">
                  {role === 'student'
                    ? 'Enter your student login details'
                    : role === 'superadmin'
                      ? 'Enter your super admin login details'
                      : 'Enter your admin login details'}
                </p> */}
                <p className="text-[#1A2C50] text-[14px] sm:text-[16px] font-semibold text-center">
                  {isOneTimeLogin
                    ? 'Set your password to activate your account'
                    : role === 'student'
                      ? 'Enter your student login details'
                      : role === 'Super Admin'
                        ? 'Enter your super admin login details'
                        : 'Enter your admin login details'}
                </p>

                {/* <div className="flex flex-col gap-4 sm:gap-5">
                  {!isSuperAdmin && (
                    <div className="w-full">
                      <input
                        {...register('institutionCode' as keyof StudentAdminLogin)}
                        placeholder="Institution Code"
                        className="w-full border-0 border-b border-gray-300 focus:border-blue-500 py-2 outline-none"
                      />
                      {(errors as Partial<Record<keyof StudentAdminLogin, any>>)
                        ?.institutionCode && (
                        <p className="text-red-500 text-xs">
                          {
                            (errors as Partial<Record<keyof StudentAdminLogin, any>>)
                              .institutionCode?.message as string
                          }
                        </p>
                      )}
                    </div>
                  )}

                  <div className="w-full">
                    <input
                      {...register('email')}
                      placeholder="Email"
                      className="w-full border-0 border-b border-gray-300 focus:border-blue-500 py-2 outline-none"
                    />
                    {errors?.email && (
                      <p className="text-red-500 text-xs">{errors.email.message as string}</p>
                    )}
                  </div>

                  <div className="w-full">
                    <input
                      type="password"
                      {...register('password')}
                      placeholder="Password"
                      className="w-full border-0 border-b border-gray-300 focus:border-blue-500 py-2 outline-none"
                    />
                    {errors?.password && (
                      <p className="text-red-500 text-xs">{errors.password.message as string}</p>
                    )}
                  </div>
                </div> */}
                <div className="flex flex-col gap-4 sm:gap-5">
                  {isOneTimeLogin ? (
                    <>
                      {/* SET PASSWORD */}
                      <div className="w-full">
                        <input
                          type="password"
                          {...register('password')}
                          placeholder="Set Password"
                          className="w-full border-0 border-b border-gray-300 focus:border-blue-500 py-2 outline-none"
                        />
                        {errors.password && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.password.message as string}
                          </p>
                        )}
                      </div>

                      {/* CONFIRM PASSWORD */}
                      <div className="w-full">
                        <input
                          type="password"
                          {...register('confirmPassword')}
                          placeholder="Confirm Password"
                          className="w-full border-0 border-b border-gray-300 focus:border-blue-500 py-2 outline-none"
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.confirmPassword.message as string}
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* EXISTING LOGIN FIELDS (UNCHANGED) */}
                      {!isSuperAdmin && (
                        <div className="w-full">
                          <input
                            {...register('institution_code' as keyof StudentAdminLogin)}
                            placeholder="Institution Code"
                            className="w-full border-0 border-b border-gray-300 focus:border-blue-500 py-2 outline-none"
                          />{' '}
                          {errors.institution_code && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.institution_code.message as string}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="w-full">
                        <input
                          {...register('email')}
                          placeholder="Email"
                          className="w-full border-0 border-b border-gray-300 focus:border-blue-500 py-2 outline-none"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email.message as string}
                          </p>
                        )}
                      </div>

                      <div className="w-full">
                        <input
                          type="password"
                          {...register('password')}
                          placeholder="Password"
                          className="w-full border-0 border-b border-gray-300 focus:border-blue-500 py-2 outline-none"
                        />
                        {errors.password && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.password.message as string}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <p
                  onClick={() => navigate.push(`/forgot-password?role=${role}`)}
                  className="flex justify-end text-[#636771] text-sm cursor-pointer mt-1 font-medium"
                >
                  Forgot Password?
                </p>

                <div className="flex justify-center">
                  {/* <Buttons role={role} status={isSubmitting} /> */}
                  <Buttons
                    role={role}
                    status={isSubmitting}
                    label={isOneTimeLogin ? 'Set Password' : undefined}
                    mode="login"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT IMAGE */}
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

export default Loginform;
