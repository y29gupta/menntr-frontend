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
 batches: z.array(z.string()).min(1, 'Select at least one batch'),
});


export const createMCQSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  questionType: z.string().min(1, 'Question type is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
});

export type CreateMCQFormValues = z.infer<typeof createMCQSchema>;

export const createAssessmentSchema = stepOneSchema.merge(stepTwoSchema);

export type CreateAssessmentForm = z.infer<typeof createAssessmentSchema>;
