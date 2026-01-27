export type Role = 'student' | 'Institution Admin' | 'faculty' | 'procurement-head' | 'Super Admin';

export const ROLE_REDIRECT: Record<Role, string> = {
  student: 'student',
  'Institution Admin': 'admin/dashboard',
  faculty: 'faculty',
  'procurement-head': 'procurement-head',
  'Super Admin': 'super-admin',
};

export type SidebarRole = 'student' | 'admin' | 'super-admin';

export const ROLE_TO_SIDEBAR_KEY: Partial<Record<Role, SidebarRole>> = {
  student: 'student',
  'Institution Admin': 'admin',
  'Super Admin': 'super-admin',
};
