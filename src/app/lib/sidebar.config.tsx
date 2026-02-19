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
  GraduationCap,
} from 'lucide-react';
import StudentIcon from '../components/icons/StudentIcon';

export type SidebarItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

// ---- Module-driven sidebar mapping ----

type SidebarItemConfig = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

export const MODULE_SIDEBAR_MAP: Record<string, SidebarItemConfig> = {
  dashboard: {
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: <LayoutDashboard size={20} />,
  },
  organization: {
    label: 'Organization',
    path: '/admin/organization',
    icon: <Users size={20} />,
  },
  'user-management': {
    label: 'User Management',
    path: '/admin/user-management',
    icon: <UserRound size={20} />,
  },
  'student-management': {
    label: 'Student Management',
    path: '/admin/student-management',
    icon: <StudentIcon size={20} />,
  },
  assessment: {
    label: 'Assessment',
    path: '/admin/assessment?tab=active',
    icon: <BarChart3 size={20} />,
  },
  assignment: {
    label: 'Assignment',
    path: '/admin/assignment?tab=active',
    icon: <BarChart3 size={20} />,
  },
};

type Module = {
  code: string;
  name: string;
  sort_order: number;
};

// export function buildSidebarFromModules(modules: Module[]): SidebarItem[] {
//   return modules
//     .sort((a, b) => a.sort_order - b.sort_order)
//     .map((mod) => MODULE_SIDEBAR_MAP[mod.code])
//     .filter((item): item is SidebarItemConfig => Boolean(item));
// }

export function buildSidebarFromModules(modules: Module[]): SidebarItem[] {
  // 🔥 TEMPORARY: Add assignment module manually until backend sends it
  const hasAssignment = modules.some((m) => m.code === 'assignment');

  const updatedModules = hasAssignment
    ? modules
    : [
        ...modules,
        {
          code: 'assignment',
          name: 'Assignment',
          sort_order: 999, // keep at bottom
        },
      ];

  return updatedModules
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((mod) => MODULE_SIDEBAR_MAP[mod.code])
    .filter((item): item is SidebarItemConfig => Boolean(item));
}

// ---- Static sidebar configs (super-admin, student) ----

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
    {
      label: 'Assignment',
      path: '/admin/assignment?tab=active',
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
