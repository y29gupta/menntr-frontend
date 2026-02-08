'use client';

import { useAuth } from '@/app/providers/AuthProvider';
import AccessDenied from './AccessDenied';
import AuthLoading from './AuthLoading';

type Props = {
  module: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export default function ModuleRoute({ module, fallback, children }: Props) {
  const { hasModule, isLoading } = useAuth();

  if (isLoading) return <AuthLoading />;

  if (!hasModule(module)) return <>{fallback ?? <AccessDenied />}</>;

  return <>{children}</>;
}
