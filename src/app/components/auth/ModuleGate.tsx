'use client';

import { useAuth } from '@/app/providers/AuthProvider';

type Props = {
  module: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export default function ModuleGate({ module, fallback = null, children }: Props) {
  const { hasModule, isLoading } = useAuth();

  if (isLoading) return null;

  if (!hasModule(module)) return <>{fallback}</>;

  return <>{children}</>;
}
