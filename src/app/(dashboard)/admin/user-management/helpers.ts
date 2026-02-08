import { USER_MGMT_PERMISSIONS } from './constants';

export function canCreateUser(permissions: string[]): boolean {
  return permissions.includes(USER_MGMT_PERMISSIONS.USERS.CREATE);
}

export function canBulkUploadUsers(permissions: string[]): boolean {
  return permissions.includes(USER_MGMT_PERMISSIONS.USERS.BULK_UPLOAD);
}

export function canEditUser(permissions: string[]): boolean {
  return permissions.includes(USER_MGMT_PERMISSIONS.USERS.EDIT);
}

export function canDeleteUser(permissions: string[]): boolean {
  return permissions.includes(USER_MGMT_PERMISSIONS.USERS.DELETE);
}

export function canAssignRoles(permissions: string[]): boolean {
  return permissions.includes(USER_MGMT_PERMISSIONS.ROLES.ASSIGN);
}

export function canAssignPermissions(permissions: string[]): boolean {
  return permissions.includes(USER_MGMT_PERMISSIONS.PERMISSIONS.ASSIGN);
}
