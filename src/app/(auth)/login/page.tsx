'use client';

import Navbar from '@/app/components/layout/Topbar';
import Loginform from '@/app/ui/Loginform';
import { useSearchParams } from 'next/navigation';

const page = () => {
  const params = useSearchParams();
  const role = params.get('role'); // "student" or "admin"

  return (
    <div className="max-w-full px-20">
      <Navbar />
      <Loginform role={role} />
    </div>
  );
};

export default page;
