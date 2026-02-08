'use client';

import { useState } from 'react';

import ProfileImageUploader from '@/app/ui/ProfileImageUploader';
import CreateStudentForm from './createStudent/CreateStudentForm';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { StudentFormValues } from './student.types';
type Props = {
  mode?: 'create' | 'edit';
  studentId?: string;
  defaultValues?: StudentFormValues;
};

export default function AddStudentLayout({ mode = 'create', defaultValues, studentId }: Props) {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const router = useRouter();

  return (
    <div className="w-full   gap-4 flex flex-col rounded-2xl bg-white p-4   shadow-[0px_0px_8px_0px_rgba(15,23,42,0.12)] bg-white/50">
      {/* Header */}
      <button
        onClick={() => router.back()}
        className="flex items-center  gap-2 text-sm !text-[#1A2C50] mb-4"
      >
        <Image src="/Go-back.svg" alt="goback" width={16} height={16} />
        Go back
      </button>

      <h2 className="text-lg text-[#1A2C50] font-semibold mb-6">Add Student</h2>

      {/* Profile image */}
      <ProfileImageUploader value={profileImage} onChange={setProfileImage} />

      {/* Form */}
      <div className="mt-8">
        <CreateStudentForm
          mode={mode}
          onCancel={() => router.push('/admin/student-management')}
          defaultValues={defaultValues}
          studentId={studentId}
          // onCancel={() => router.push('/admin/student-management')}
        />
      </div>
    </div>
  );
}
