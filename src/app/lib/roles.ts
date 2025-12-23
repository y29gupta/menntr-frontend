export type Role =
  | 'student'
  | 'admin'
  | 'faculty'
  | 'procurement-head'
  | 'superadmin';

export const ROLE_REDIRECT: Record<Role, string> = {
  student: '/student',
  admin: '/admin',
  faculty: '/faculty',
  'procurement-head': '/procurement-head',
  superadmin: '/super-admin',
};
