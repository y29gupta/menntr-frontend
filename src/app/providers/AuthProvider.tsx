'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

// ---- Types ----

interface AuthUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface AuthInstitution {
  id: number;
  name: string;
  code: string;
}

interface AuthPlan {
  code: string;
}

interface AuthRole {
  id: number;
  name: string;
  institution_id: number;
  is_system_role: boolean;
  role_hierarchy_id: number | null;
  hierarchy_level: number | null;
  hierarchy_name: string | null;
}

interface AuthModule {
  code: string;
  name: string;
  icon: string;
  category: string;
  sort_order: number;
}

export interface AuthContextType {
  user: AuthUser | null;
  institution: AuthInstitution | null;
  plan: AuthPlan | null;
  roles: AuthRole[];
  permissions: string[];
  modules: AuthModule[];
  isLoading: boolean;
  isSuperAdmin: boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasModule: (moduleCode: string) => boolean;
}

// ---- Context ----

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---- Fetcher ----

async function fetchAuthContext() {
  const res = await fetch(`/api/auth/me/context`, {
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch auth context');
  }

  return res.json();
}

// ---- Provider ----

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useQuery({
    queryKey: ['auth', 'context'],
    queryFn: fetchAuthContext,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    retry: 1,
  });

  const permissions: string[] = data?.permissions ?? [];
  // const modules: AuthModule[] = data?.modules ?? []; later use it when getting assignment coming from backedn\

  const backendModules: AuthModule[] = data?.modules ?? [];

  // ⚠️ TEMPORARY FIX:
  // Backend is not sending "assignment" module yet.
  // Injecting it manually for UI development.
  // REMOVE this block once backend includes assignment in module response.
  const hasAssignment = backendModules.some((m) => m.code === 'assignment');

  const modules: AuthModule[] = hasAssignment
    ? backendModules
    : [
        ...backendModules,
        {
          code: 'assignment',
          name: 'Assignment',
          icon: 'BarChart3',
          category: 'academic',
          sort_order: 999,
        },
      ];

  const roles: AuthRole[] = data?.roles ?? [];

  const permissionSet = useMemo(() => new Set(permissions), [permissions]);
  const moduleSet = useMemo(() => new Set(modules.map((m) => m.code)), [modules]);

  const isSuperAdmin = roles.some((r) => r.name === 'Super Admin' && r.is_system_role);

  const value: AuthContextType = useMemo(
    () => ({
      user: data?.user ?? null,
      institution: data?.institution ?? null,
      plan: data?.plan ?? null,
      roles,
      permissions,
      modules,
      isLoading,
      isSuperAdmin,
      hasPermission: (permission: string) => isSuperAdmin || permissionSet.has(permission),
      hasAnyPermission: (perms: string[]) =>
        isSuperAdmin || perms.some((p) => permissionSet.has(p)),
      hasModule: (moduleCode: string) => isSuperAdmin || moduleSet.has(moduleCode),
    }),
    [data, isLoading, isSuperAdmin, permissions, modules, roles, permissionSet, moduleSet]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ---- Hook ----

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
