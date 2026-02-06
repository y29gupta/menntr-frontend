'use client';

import { z } from 'zod';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormHeader from './FormHeader';

/* ---------------- SCHEMA ---------------- */
export const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  // mobile: z.string().min(10, 'Phone must be at least 10 characters'),
  mobile: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

type Props = {
  onBack: () => void;
  onNext: () => void;
  mode: 'create' | 'edit';
};

const ProfileForm = ({ onBack, onNext, mode }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="w-full h-full flex flex-col">
      <FormHeader onBack={onBack} title={mode === 'edit' ? 'Edit User' : 'Add User'} />

      {/* Avatar */}
      <div className="flex justify-center mb-4 flex-shrink-0">
        <div className="relative">
          <div className="w-40 h-40 rounded-full overflow-hidden flex items-center justify-center bg-[#E8EBF0]">
            {preview ? (
              <img src={preview} alt="Profile preview" className="h-full w-full object-cover" />
            ) : (
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="28" r="16" fill="#B8BCC8" />
                <path d="M12 70C12 55 24 44 40 44C56 44 68 55 68 70" fill="#B8BCC8" />
              </svg>
            )}
          </div>

          <label className="absolute bottom-1 right-1 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-sm cursor-pointer border border-gray-200">
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => e.target.files && setPreview(URL.createObjectURL(e.target.files[0]))}
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="#666"
              strokeWidth="1.5"
            >
              <path d="M12 2L14 4L6 12H4V10L12 2Z" />
              <path d="M10.5 3.5L12.5 5.5" />
            </svg>
          </label>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 bg-white border-2 border-gray-200 rounded-[24px] shadow-sm px-6 py-8 sm:px-10 sm:py-10 flex flex-col">
        <form onSubmit={handleSubmit(() => onNext())} className="flex flex-col h-full">
          <div className="relative flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-y-10">
            {/* First Name */}
            <div className="sm:pr-10">
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input
                {...register('firstName')}
                placeholder="John"
                className="w-full border-b border-gray-300 pb-2 focus:outline-none"
              />
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="sm:pl-10">
              <label className="block text-sm font-medium mb-2">Email Id</label>
              <input
                {...register('email')}
                placeholder="admin@abc.edu"
                className="w-full border-b border-gray-300 pb-2 focus:outline-none"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <span className="hidden sm:block absolute left-1/2 inset-y-0 w-[2px] bg-gray-300" />

            {/* Last Name */}
            <div className="sm:pr-10">
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input
                {...register('lastName')}
                placeholder="Doe"
                className="w-full border-b border-gray-300 pb-2 focus:outline-none"
              />
              {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
            </div>

            {/* Phone */}
            <div className="sm:pl-10">
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                {...register('mobile')}
                placeholder="+91 73854 XXXXX"
                className="w-full border-b border-gray-300 pb-2 focus:outline-none"
              />
              {errors.mobile && <p className="text-xs text-red-500">{errors.mobile.message}</p>}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              className="px-10 py-2.5 rounded-full text-sm font-medium 
              bg-[linear-gradient(90deg,#904BFF_0%,#C053C2_100%)]
              text-white!"
            >
              {mode === 'edit' ? 'Save & Go Next' : 'Go Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
