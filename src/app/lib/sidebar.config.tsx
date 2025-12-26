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
      path: '/super-admin',
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: 'Manage Institutions',
      path: '/super-admin/institutions',
      icon: <Building2 size={20} />,
    },
    {
      label: 'License Management',
      path: '/super-admin/licenses',
      icon: <Settings size={20} />,
    },
    {
      label: 'System Health',
      path: '/super-admin/system-health',
      icon: <Activity size={20} />,
    },
  ],

  admin: [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: 'Organization',
      path: '/admin/organization',
      icon: <Users size={20} />,
    },
    {
      label: 'User Management',
      path: '/admin/reports',
      icon: <BarChart3 size={20} />,
    },
    {
      label: 'Student Management',
      path: '/admin/reports',
      icon: <BarChart3 size={20} />,
    },
    {
      label: 'Assessment',
      path: '/admin/reports',
      icon: <BarChart3 size={20} />,
    },
  ],

  student: [
    {
      label: 'Dashboard',
      path: '/student',
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: 'My Courses',
      path: '/student/courses',
      icon: <BookOpen size={20} />,
    },
  ],
} as const;
