'use client';

import Navbar from '@/app/components/layout/Topbar';
import Loginform from '@/app/ui/Loginform';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginPageContent() {
  const params = useSearchParams();
  const role = params.get('role') ?? ''; // default fallback

  return (
    <div className="max-w-full px-20">
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
