import { STUDENT_MGMT_PERMISSIONS } from './constants';

export function canCreateStudent(permissions: string[]): boolean {
  return permissions.includes(STUDENT_MGMT_PERMISSIONS.STUDENTS.CREATE);
}

export function canBulkUploadStudents(permissions: string[]): boolean {
  return permissions.includes(STUDENT_MGMT_PERMISSIONS.STUDENTS.BULK_UPLOAD);
}

export function canEditStudent(permissions: string[]): boolean {
  return permissions.includes(STUDENT_MGMT_PERMISSIONS.STUDENTS.EDIT);
}

export function canDeleteStudent(permissions: string[]): boolean {
  return permissions.includes(STUDENT_MGMT_PERMISSIONS.STUDENTS.DELETE);
}

export function canViewPerformance(permissions: string[]): boolean {
  return permissions.includes(STUDENT_MGMT_PERMISSIONS.PERFORMANCE.VIEW);
}
