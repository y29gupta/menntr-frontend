import { ASSESSMENT_PERMISSIONS } from './constants';

export function canCreateAssessment(permissions: string[]): boolean {
  return permissions.includes(ASSESSMENT_PERMISSIONS.ASSESSMENTS.CREATE);
}

export function canEditAssessment(permissions: string[]): boolean {
  return permissions.includes(ASSESSMENT_PERMISSIONS.ASSESSMENTS.EDIT);
}

export function canDeleteAssessment(permissions: string[]): boolean {
  return permissions.includes(ASSESSMENT_PERMISSIONS.ASSESSMENTS.DELETE);
}

export function canPublishAssessment(permissions: string[]): boolean {
  return permissions.includes(ASSESSMENT_PERMISSIONS.ASSESSMENTS.PUBLISH);
}

export function canViewPerformance(permissions: string[]): boolean {
  return permissions.includes(ASSESSMENT_PERMISSIONS.PERFORMANCE.VIEW);
}

export function canManageQuestions(permissions: string[]): boolean {
  return permissions.includes(ASSESSMENT_PERMISSIONS.QUESTIONS.MANAGE);
}
