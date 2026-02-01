// src/app/not-found.tsx
'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>

      <p className="mt-4 text-lg text-gray-600">Oops! The page you’re looking for doesn’t exist.</p>

      <Link
        href="/"
        className="mt-6 rounded-md bg-black px-6 py-2 text-white transition hover:bg-gray-800"
      >
        Go back home
      </Link>
    </div>
  );
}
