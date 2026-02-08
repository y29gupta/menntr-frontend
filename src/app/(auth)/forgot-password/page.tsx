'use client';
import Navbar from '@/app/components/layout/Topbar';
import ForgotPasswordForm from '@/app/ui/ForgotPasswordForm';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ForgotPasswordPageContent() {
  const params = useSearchParams();
  const role = params.get('role') ?? '';

  return (
    <div className="max-w-full px-4 sm:px-6 md:px-8 lg:px-20 overflow-x-hidden max-h-[100vh]">
      <Navbar />
      <ForgotPasswordForm role={role} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordPageContent />
    </Suspense>
  );
}
