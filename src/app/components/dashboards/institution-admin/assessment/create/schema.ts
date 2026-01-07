import { z } from 'zod';

export const stepOneSchema = z.object({
  AssessmentName: z.string().min(1),
  description: z.string().optional(),
  category: z.enum(['Aptitude', 'Domain']),
  AssessmentType: z.enum(['Practice', 'Graded']),
  questionType: z.enum(['MCQ', 'Coding', 'Theory']),
});

export const stepTwoSchema = z.object({
  institutionCategory: z.enum(['Engineering', 'Management', 'Agriculture']),
  department: z.enum(['CSE', 'Mech', 'Civil']),
  batch: z.string().min(1),
});

export const createAssessmentSchema = stepOneSchema.merge(stepTwoSchema);

export type CreateAssessmentForm = z.infer<typeof createAssessmentSchema>;
