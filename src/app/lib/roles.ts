export type Role =
  | 'Student'
  | 'Institution Admin'
  | 'faculty'
  | 'procurement-head'
  | 'Super Admin';

export const ROLE_REDIRECT: Record<Role, string> = {
  Student: 'Student',
  "Institution Admin": 'admin/dashboard',
  faculty: 'faculty',
  'procurement-head': 'procurement-head',
  "Super Admin": 'super-admin',
};



export type SidebarRole = 'Student' | 'admin' | 'super-admin';

export const ROLE_TO_SIDEBAR_KEY: Partial<Record<Role, SidebarRole>> = {
  Student: 'Student',
  'Institution Admin': 'admin',
  'Super Admin': 'super-admin',
};