export type Role =
  | 'student'
  | 'Institution Admin'
  | 'faculty'
  | 'procurement-head'
  | 'Super Admin';

export const ROLE_REDIRECT: Record<Role, string> = {
  student: 'student',
  "Institution Admin": 'admin/dashboard',
  faculty: 'faculty',
  'procurement-head': 'procurement-head',
  "Super Admin": 'super-admin',
};
