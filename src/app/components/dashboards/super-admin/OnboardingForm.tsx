'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InstitutionFormValues, institutionSchema } from '@/app/lib/institution';
import { Button } from 'antd';
import CheckedIcon from '../../icons/CheckedIcon';
import { Check } from 'lucide-react';

type Props = {
  mode: 'create' | 'edit';
  defaultValues?: InstitutionFormValues;
  onCancel: () => void;
  onSubmitForm: (data: InstitutionFormValues) => void;
};

export default function OnboardingForm({ mode, defaultValues, onCancel, onSubmitForm }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InstitutionFormValues>({
    resolver: zodResolver(institutionSchema),
    defaultValues: defaultValues ?? {
      name: '',
      code: '',
      contactEmail: '',
      plan: 'PREMIUM',
    },
  });

  const planFeatures: Record<'BASIC' | 'PREMIUM', string[]> = {
    BASIC: ['User & Role ', 'Organization Structure', 'Student ', 'Assessment Management'],
    PREMIUM: [
      'User & Role Management',
      'Organization Structure',
      'Student Management',
      'Assessment Management',
    ],
  };

  const resourceLimits = [
    {
      label: 'Max Students',
      placeholder: 'Example: 600',
    },
    {
      label: 'Max Admins',
      placeholder: 'Example: 10',
    },
    {
      label: 'Max Storage (GB)',
      placeholder: 'Example: 100',
    },
  ];

  const plan = watch('plan');

  return (
    <div className="flex flex-col items-center justify-center gap-[24px] rounded-2xl bg-white p-9 pt-[10px] shadow-sm">
      {/* BACK */}
      <div className="flex w-full justify-between">
        <h1 className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-gray-800 sm:text-base lg:text-lg">
          <button onClick={onCancel} className="mb-4 flex gap-2 text-sm text-gray-500">
            <img src="/Go-back.svg" alt="" className="cursor-pointer" />
            Go back to dashboard
          </button>
        </h1>

        <Button danger type="default" className="text-xs sm:text-sm">
          Log out
        </Button>
      </div>

      {/* TITLE */}

      <div className="item- flex w-full flex-col justify-evenly gap-6">
        <h2 className="mb-8 text-center text-xl font-semibold">
          {mode === 'create' ? ' Institution Setup' : 'Edit Institution'}
        </h2>
        <div className="flex justify-between">
          <h2 className="text-[#0F172A]">Institutoin Details</h2>
          <button
            onClick={handleSubmit(onSubmitForm)}
            className="cursor-pointer rounded-full bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)] px-6 py-2 !text-white transition-all duration-300 ease-in-out hover:bg-[linear-gradient(90deg,#7F3FFF_0%,#A844B3_100%)]"
          >
            {mode === 'create' ? 'Create Institution' : 'Save Changes'}
          </button>
        </div>
        <div className="w-full border-b border-[#C3CAD9]"></div>
        <div className="flex w-full justify-between gap-6">
          <div className="w-full max-w-[462px] p-2">
            <div className="space-y-6">
              <div>
                <label className="text-[16px] text-[#0F172A]">Institution Name</label>
                <input
                  {...register('name')}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  placeholder="ABC College"
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label className="text-sm text-[#0F172A]">Institution Code</label>
                <input
                  {...register('code')}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  placeholder="ABC-ENG-001"
                />
                {errors.code && <p className="text-xs text-red-500">{errors.code.message}</p>}
              </div>

              <div>
                <label className="text-sm text-[#0F172A]">Contact Email</label>
                <input
                  {...register('contactEmail')}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none"
                  placeholder="admin@abc.edu"
                />
                {errors.contactEmail && (
                  <p className="text-xs text-red-500">{errors.contactEmail.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full max-w-[500px] px-4 py-2">
            <h3 className="mb-4 text-[18px] font-medium text-[#0F172A]">Select Plan / Modules</h3>

            <div className="mb-6 flex justify-around gap-4">
              <button
                type="button"
                onClick={() => setValue('plan', 'BASIC')}
                className={`flex cursor-pointer items-center gap-3 rounded-full border px-10 py-3 transition-all duration-300 ease-in-out hover:bg-[linear-gradient(90deg,#7F3FFF_0%,#A844B3_100%)] hover:!text-white ${
                  plan === 'BASIC'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                {plan === 'BASIC' && (
                  <span className="group-hover:!text-white">
                    <CheckedIcon />
                  </span>
                )}
                Basic
              </button>

              <button
                type="button"
                onClick={() => setValue('plan', 'PREMIUM')}
                className={`group flex cursor-pointer items-center gap-3 rounded-full border px-10 py-3 transition-all duration-300 ease-in-out hover:bg-[linear-gradient(90deg,#7F3FFF_0%,#A844B3_100%)] hover:!text-white ${
                  plan === 'PREMIUM'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                {plan === 'PREMIUM' && (
                  <span className="">
                    <CheckedIcon />
                  </span>
                )}
                Premium
              </button>
            </div>

            <ul className="space-y-3 text-sm text-gray-700">
              {planFeatures[plan].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-[16px]">
                  <Check className="h-4 w-4 shrink-0 text-purple-600" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full border-b border-[#C3CAD9]"></div>

        <div className="w-full">
          <h2 className="mb-4 text-[18px] font-medium text-[#0F172A]">Resource limits</h2>

          <div className="flex gap-6">
            {resourceLimits.map((item) => (
              <div key={item.label} className="flex-1 rounded-xl border border-[#E2E8F0] p-6">
                <div className="flex flex-col gap-2 border-b border-[#C3CAD9]">
                  <h3 className="text-[16px] font-medium text-[#0F172A]">{item.label}</h3>
                  <p className="text-sm text-[#64748B]">{item.placeholder}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ACTION */}
    </div>
  );
}
