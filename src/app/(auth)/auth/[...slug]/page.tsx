'use client';
import Navbar from '@/app/components/layout/Topbar';
import Loginform from '@/app/ui/Loginform';
import { usePathname, useSearchParams } from 'next/navigation';

const page = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  console.log(pathname, params.get('token'), 'pathname');
  return (
    <div className="max-w-full px-4 sm:px-6 md:px-8 lg:px-20 overflow-x-hidden max-h-[100vh]">
      <Navbar />
      <Loginform role="admin" />
    </div>
  );
};

export default page;
