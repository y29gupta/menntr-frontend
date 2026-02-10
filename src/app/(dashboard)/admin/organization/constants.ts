import { PERMISSIONS } from '@/app/constants/permissions';

export const ORG_PERMISSIONS = PERMISSIONS.ORGANIZATION;

export const ORG_TABS = ['Categories', 'Departments', 'Batches', 'Role Hierarchy'] as const;
export type OrgTab = (typeof ORG_TABS)[number];

export const TAB_PERMISSIONS: Record<OrgTab, string> = {
  Categories: ORG_PERMISSIONS.CATEGORIES.VIEW,
  Departments: ORG_PERMISSIONS.DEPARTMENTS.VIEW,
  Batches: ORG_PERMISSIONS.BATCHES.VIEW,
  'Role Hierarchy': ORG_PERMISSIONS.HIERARCHY.VIEW,
};
