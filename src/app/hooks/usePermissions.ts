import { useAuth, AuthContextType } from '@/app/providers/AuthProvider';

export { useAuth };
export type { AuthContextType };

export function usePermission(code: string): boolean {
  const { hasPermission } = useAuth();
  return hasPermission(code);
}

export function useAnyPermission(codes: string[]): boolean {
  const { hasAnyPermission } = useAuth();
  return hasAnyPermission(codes);
}

export function useModule(moduleCode: string): boolean {
  const { hasModule } = useAuth();
  return hasModule(moduleCode);
}
