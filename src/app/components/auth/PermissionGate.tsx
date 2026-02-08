'use client';

import { useAuth } from '@/app/providers/AuthProvider';

type Props = {
  permission?: string;
  anyOf?: string[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export default function PermissionGate({ permission, anyOf, fallback = null, children }: Props) {
  const { hasPermission, hasAnyPermission, isLoading } = useAuth();

  if (isLoading) return null;

  let allowed = false;

  if (permission) {
    allowed = hasPermission(permission);
  } else if (anyOf && anyOf.length > 0) {
    allowed = hasAnyPermission(anyOf);
  }

  if (!allowed) return <>{fallback}</>;

  return <>{children}</>;
}
