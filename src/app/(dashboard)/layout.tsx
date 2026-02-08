import DashboardShell from '../components/layout/DashboardShell';
import { getUserRole } from '../lib/auth.server';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const role = await getUserRole();

  return <DashboardShell role={role}>{children}</DashboardShell>;
}
