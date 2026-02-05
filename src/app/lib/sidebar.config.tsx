import {
  LayoutDashboard,
  Building2,
  Settings,
  Activity,
  Users,
  BarChart3,
  BookOpen,
  UserRound,
  BookText,
  ShieldCheck,
  FileText,
  ClipboardList,
} from 'lucide-react';
import StudentIcon from '../components/icons/StudentIcon';

export type SidebarItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

export const SIDEBAR_CONFIG = {
  'super-admin': [
    {
      label: 'Dashboard',
      path: '/super-admin',
      icon: <LayoutDashboard size={20} />,
    },

    // 🔶 UPCOMING FEATURES (as per Figma)
    {
      label: 'Manage Institutions',
      path: '/super-admin/institutions',
      icon: <Building2 size={20} />,
      disabled: true,
    },
    {
      label: 'License Management',
      path: '/super-admin/licenses',
      icon: <Settings size={20} />,
      disabled: true,
    },
    {
      label: 'Procurement Requests',
      path: '/super-admin/procurement',
      icon: <ClipboardList size={20} />,
      disabled: true,
    },
    {
      label: 'System Health',
      path: '/super-admin/system-health',
      icon: <Activity size={20} />,
      disabled: true,
    },
    {
      label: 'Feature Usage Analytics',
      path: '/super-admin/feature-usage',
      icon: <BarChart3 size={20} />,
      disabled: true,
    },
    {
      label: 'Role Management (RBAC)',
      path: '/super-admin/rbac',
      icon: <ShieldCheck size={20} />,
      disabled: true,
    },
    {
      label: 'Reports',
      path: '/super-admin/reports',
      icon: <FileText size={20} />,
      disabled: true,
    },
    {
      label: 'Settings',
      path: '/super-admin/settings',
      icon: <Settings size={20} />,
      disabled: true,
    },

    // {
    //   label: 'License Management',
    //   path: '/super-admin/licenses',
    //   icon: <Settings size={20} />,
    // },
    // {
    //   label: 'System Health',
    //   path: '/super-admin/system-health',
    //   icon: <Activity size={20} />,
    // },
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
      path: '/admin/user-management',
      icon: <UserRound size={20} />,
    },
    {
      label: 'Student Management',
      path: '/admin/student-management',
      icon: <StudentIcon size={20} />,
    },
    {
      label: 'Assessment',
      path: '/admin/assessment?tab=active',
      icon: <BarChart3 size={20} />,
    },
  ],

  student: [
    {
      label: 'Dashboard',
      path: '/student/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: 'Assessment',
      path: '/student/assessment',
      icon: <BookOpen size={20} />,
    },
    {
      label: 'Assignment',
      path: '/student/assignment',
      icon: <BookText size={20} />,
    },
    {
      label: 'placement',
      path: '/student/placement',
      icon: <BookOpen size={20} />,
    },
    {
      label: 'Profile',
      path: '/student/profile',
      icon: <BookOpen size={20} />,
    },
  ],
} as const;
