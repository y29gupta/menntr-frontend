'use client';

import { ShieldX } from 'lucide-react';

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
      <ShieldX className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
      <p className="text-gray-500 max-w-md">
        You don&apos;t have permission to access this module. Contact your administrator to request
        access.
      </p>
    </div>
  );
}
