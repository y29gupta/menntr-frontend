export const modules = [
  'User role and management',
  'Organization structure',
  'Student management',
  'Assessment management',
  'Report and analytics',
];

export const moduleOptions: Record<string, string[]> = {
  'User role and management': ['All', 'Role & User Management', 'Advanced Permission Control'],
  'Organization structure': [
    'All',
    'Institution/Organization',
    'Org Chart & Visualization',
    'Faculty Management',
  ],
  'Student management': [
    'All',
    'Student Data Management',
    'Advanced Student Tracking',
    'Student Analytics (Advanced)',
    'Alumni tracking',
  ],
  'Assessment management': [
    'All',
    'CO-PO Assessments',
    "Revised Bloom's Types",
    'Coding Challenges (Advanced, multi-language)',
    'AI Theory Question (Advanced)',
    'AI Practice Sets (CO-PO based+scenario/use+NFL)',
    'AI Proctoring',
    'Token assessments',
  ],
  'Report and analytics': [
    'All',
    'Status Reports',
    'Department Analytics',
    'Dashboard (Advanced)',
    'Advanced Analytics (Custom reports, scheduled)',
  ],
};
