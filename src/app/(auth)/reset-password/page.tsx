'use client';

import Navbar from '@/app/components/layout/Topbar';
import ResetPasswordForm from '@/app/ui/ResetPasswordForm';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { validateResetToken } from '@/app/lib/loginService';

function ResetPasswordPageContent() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get('token');
  const email = params.get('email');
  const role = params.get('role');

  const [valid, setValid] = useState<boolean | null>(null);

  const isDev = process.env.NODE_ENV === 'development';

  useEffect(() => {
    if (!token || !email || !role) {
      router.push('/error?reason=missing_params');
      return;
    }

    if (isDev) {
      setValid(true);
      return;
    }

    (async () => {
      try {
        await validateResetToken(token, email, role);
        setValid(true);
      } catch (err) {
        setValid(false);
        router.push('/error?reason=invalid_token');
      }
    })();
  }, [token, email, role, router]);

  if (valid === null) {
    return <div className="text-center p-10">Validating reset link...</div>;
  }

  if (!valid) {
    return null;
  }

  return (
    <div className="max-w-full px-4 sm:px-6 md:px-8 lg:px-20 overflow-x-hidden max-h-[100vh]">
      <Navbar />
      <ResetPasswordForm token={token!} role={role!} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPageContent />
    </Suspense>
  );
}
