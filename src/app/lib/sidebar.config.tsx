import {
  LayoutDashboard,
  Building2,
  Settings,
  Activity,
  Users,
  BarChart3,
  BookOpen,
} from 'lucide-react';

export type SidebarItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

export const SIDEBAR_CONFIG = {
  'super-admin': [
    {
      label: 'Dashboard',
      path: '/dashboard/super-admin',
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: 'Manage Institutions',
      path: '/dashboard/super-admin/institutions',
      icon: <Building2 size={20} />,
    },
    {
      label: 'License Management',
      path: '/dashboard/super-admin/licenses',
      icon: <Settings size={20} />,
    },
    {
      label: 'System Health',
      path: '/dashboard/super-admin/system-health',
      icon: <Activity size={20} />,
    },
  ],

  admin: [
    {
      label: 'Dashboard',
      path: '/dashboard/admin',
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: 'Faculty',
      path: '/dashboard/admin/faculty',
      icon: <Users size={20} />,
    },
    {
      label: 'Reports',
      path: '/dashboard/admin/reports',
      icon: <BarChart3 size={20} />,
    },
  ],

  student: [
    {
      label: 'Dashboard',
      path: '/dashboard/student',
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: 'My Courses',
      path: '/dashboard/student/courses',
      icon: <BookOpen size={20} />,
    },
  ],
} as const;
