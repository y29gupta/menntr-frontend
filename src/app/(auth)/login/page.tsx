'use client';
import Navbar from '@/app/components/layout/Topbar';
import Loginform from '@/app/ui/Loginform';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginPageContent() {
  const params = useSearchParams();
  const role = params.get('role') ?? '';
  console.log(role, 'roless');

  return (
    <div className="max-w-full px-4 sm:px-6 md:px-8 lg:px-20 overflow-x-hidden max-h-[100vh]">
      <Navbar />
      <Loginform role={role} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
