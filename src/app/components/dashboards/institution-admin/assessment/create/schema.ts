import { z } from 'zod';

// export const stepOneSchema = z.object({
//   title: z.string().min(1,"Assessment name is required"),
//   description: z.string().optional(),
//   // category: z.enum(['Aptitude', 'Domain']),
//   // AssessmentType: z.enum(['Practice', 'Graded']),
//   // questionType: z.enum(['MCQ', 'Coding', 'Theory']),

//    category: z.string().min(1,"category selection is required"),
//   AssessmentType: z.string().min(1,'Please select the Assessment Type'),
//   questionType: z.string().min(1,"Please select the Question Type"),
// });

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



export const createMCQSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  questionType: z.string().min(1, 'Question type is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
});

export type CreateMCQFormValues = z.infer<typeof createMCQSchema>;

export const createAssessmentSchema = stepOneSchema.merge(stepTwoSchema);

export type CreateAssessmentForm = z.infer<typeof createAssessmentSchema>;
