import { ORG_TABS, TAB_PERMISSIONS, OrgTab, ORG_PERMISSIONS } from './constants';

export function getVisibleTabs(permissions: string[]): OrgTab[] {
  return ORG_TABS.filter((tab) => permissions.includes(TAB_PERMISSIONS[tab])) as OrgTab[];
}

export function canCreateInTab(tab: OrgTab, permissions: string[]): boolean {
  const createMap: Partial<Record<OrgTab, string>> = {
    Categories: ORG_PERMISSIONS.CATEGORIES.CREATE,
    Departments: ORG_PERMISSIONS.DEPARTMENTS.CREATE,
    Batches: ORG_PERMISSIONS.BATCHES.CREATE,
  };
  const perm = createMap[tab];
  return perm ? permissions.includes(perm) : false;
}

export function canEditInTab(tab: OrgTab, permissions: string[]): boolean {
  const editMap: Partial<Record<OrgTab, string>> = {
    Categories: ORG_PERMISSIONS.CATEGORIES.EDIT,
    Departments: ORG_PERMISSIONS.DEPARTMENTS.EDIT,
    Batches: ORG_PERMISSIONS.BATCHES.EDIT,
    'Role Hierarchy': ORG_PERMISSIONS.HIERARCHY.MANAGE,
  };
  const perm = editMap[tab];
  return perm ? permissions.includes(perm) : false;
}

export function canDeleteInTab(tab: OrgTab, permissions: string[]): boolean {
  const deleteMap: Partial<Record<OrgTab, string>> = {
    Categories: ORG_PERMISSIONS.CATEGORIES.DELETE,
    Departments: ORG_PERMISSIONS.DEPARTMENTS.DELETE,
    Batches: ORG_PERMISSIONS.BATCHES.DELETE,
  };
  const perm = deleteMap[tab];
  return perm ? permissions.includes(perm) : false;
}
