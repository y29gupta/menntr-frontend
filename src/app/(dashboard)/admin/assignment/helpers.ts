import { ASSIGNMENT_PERMISSIONS } from './constants';

export function canCreateAssignment(permissions: string[]): boolean {
  return permissions.includes(ASSIGNMENT_PERMISSIONS.ASSIGNMENT.CREATE);
}

export function canEditAssignment(permissions: string[]): boolean {
  return permissions.includes(ASSIGNMENT_PERMISSIONS.ASSIGNMENT.EDIT);
}

export function canDeleteAssignment(permissions: string[]): boolean {
  return permissions.includes(ASSIGNMENT_PERMISSIONS.ASSIGNMENT.DELETE);
}

export function canPublishAssignment(permissions: string[]): boolean {
  return permissions.includes(ASSIGNMENT_PERMISSIONS.ASSIGNMENT.PUBLISH);
}

export function canViewPerformance(permissions: string[]): boolean {
  return permissions.includes(ASSIGNMENT_PERMISSIONS.PERFORMANCE.VIEW);
}

export function canManageQuestions(permissions: string[]): boolean {
  return permissions.includes(ASSIGNMENT_PERMISSIONS.QUESTIONS.MANAGE);
}
