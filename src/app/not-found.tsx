// src/app/not-found.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  const redirect = pathname.split('/')[1];
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>

      <p className="mt-4 text-lg text-gray-600">Oops! The page you’re looking for doesn’t exist.</p>

      <Link
        href={`/${redirect}/dashboard`}
        className="mt-6 rounded-md bg-black px-6 py-2 text-white transition hover:bg-gray-800"
      >
        Go back home
      </Link>
    </div>
  );
}
