import { api } from '@/app/lib/api';

/* ================= OVERVIEW ================= */

export const fetchAssessmentOverview = (assessmentId: string) =>
  api.get(`/assessments/${assessmentId}/performance/overview`);

/* ================= QUESTIONS ================= */

export const fetchQuestionPerformance = (assessmentId: string) =>
  api.get(`/assessments/${assessmentId}/performance/questions`);

/* ================= ATTEMPTS ================= */

export const fetchAttempts = (assessmentId: string) =>
  api.get(`/assessments/${assessmentId}/performance/attempts`);

/* ================= CANDIDATES ================= */

export const fetchCandidates = ({
  assessmentId,
  page,
  limit,
  search,
  attempt,
}: {
  assessmentId: string;
  page: number;
  limit: number;
  search?: string;
  attempt?: number;
}) =>
  api.get(`/assessments/${assessmentId}/performance/candidates`, {
    params: { page, limit, search, attempt },
  });

/* ================= STUDENT MODAL ================= */

export const fetchStudentSummary = (assessmentId: number, studentId: number, attemptId: number) =>
  api.get(`/assessments/${assessmentId}/students/${studentId}/attempts/${attemptId}/summary`);

export const fetchStudentSections = (assessmentId: number, studentId: number, attemptId: number) =>
  api.get(`/assessments/${assessmentId}/students/${studentId}/attempts/${attemptId}/sections`);

export const fetchStudentIntegrity = (assessmentId: number, studentId: number, attemptId: number) =>
  api.get(`/assessments/${assessmentId}/students/${studentId}/attempts/${attemptId}/integrity`);
