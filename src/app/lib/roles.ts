export type Role =
  | 'student'
  | 'institution Admin'
  | 'faculty'
  | 'procurement-head'
  | 'Super Admin';

export const ROLE_REDIRECT: Record<Role, string> = {
  student: 'student',
  "institution Admin": 'insitution Admin',
  faculty: 'faculty',
  'procurement-head': 'procurement-head',
  "Super Admin": 'super-admin',
};
