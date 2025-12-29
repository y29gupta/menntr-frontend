'use client';
import Navbar from '@/app/components/layout/Topbar';
import { loginpasswordsetup } from '@/app/lib/loginService';
import Loginform from '@/app/ui/Loginform';
import axios from 'axios';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const emailToken = params.get('token');

  const [setupToken, setSetupToken] = useState<string | null>(null);

  const token = params.get('token');

  const consumeInvite = async () => {
    const response = await loginpasswordsetup({ token: emailToken });

    setSetupToken(response?.token);
  };

  useEffect(() => {
    if (emailToken) consumeInvite();
  }, [emailToken]);

  return (
    <div className="max-w-full px-4 sm:px-6 md:px-8 lg:px-20 overflow-x-hidden max-h-[100vh]">
      <Navbar />
      <Loginform role="admin" setupToken={setupToken} />
    </div>
  );
};

export default page;
