'use client';

import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  router.push('/student/dashboard');
  return <></>;
};

export default page;
