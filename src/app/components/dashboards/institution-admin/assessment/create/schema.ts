import { z } from 'zod';


export const mcqOptionSchema = z.object({
  text: z.string().min(1, 'Option text is required'),
  correct: z.boolean(),
});

export const stepOneSchema = z.object({
  title: z.string().min(1, 'Assessment name is required'),
  description: z.string().optional(),

  category: z.string().min(1, 'Category is required'),
  AssessmentType: z.string().min(1, 'Assessment type is required'),
  questionType: z.string().min(1, 'Question type is required'),
});


// export const stepTwoSchema = z.object({
//   institutionCategory: z.enum(['Engineering', 'Management', 'Agriculture']),
//   department: z.enum(['CSE', 'Mech', 'Civil']),
//  batches: z.array(z.string()).min(1, 'Select at least one batch'),
// });

export const stepTwoSchema = z.object({
  institutionCategory: z.string().min(1, 'Institution category is required'),
  department: z.string().min(1, 'Department is required'),
  batches: z.array(z.string()).min(1, 'Select at least one batch'),
});



// export const createMCQSchema = z.object({
//   topic: z.string().min(1, 'Topic is required'),
//   questionType: z.string().min(1, 'Question type is required'),
//   difficulty: z.enum(['easy', 'medium', 'hard']),
// });

export const createMCQSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  questionType: z.string().min(1, 'Question type is required'),
  difficulty: z.string().min(1, 'Difficulty is required'),
  options: z
    .array(mcqOptionSchema)
    .min(2, 'At least two options are required')
    .refine(
      (opts) => opts.some((o) => o.correct),
      'At least one correct option is required'
    ),
});

export type CreateMCQFormValues = z.infer<typeof createMCQSchema>;

export const createAssessmentSchema = stepOneSchema.merge(stepTwoSchema);

export type CreateAssessmentForm = z.infer<typeof createAssessmentSchema>;

export type StepOneForm = z.infer<typeof stepOneSchema>;
export type StepTwoForm = z.infer<typeof stepTwoSchema>;

