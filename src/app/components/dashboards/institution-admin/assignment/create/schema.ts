import { z } from 'zod';

// export const createAssignmentSchema = z.object({
//   title: z.string().min(1),
//   description: z.string().optional(),
//   category: z.string().min(1),
//   assignmentType: z.string().min(1),
//   // due_date: z.string().min(1),
//   institutionCategory: z.string().min(1),
//   department: z.string().min(1),
//   batches: z.array(z.string()).min(1),
// });

// export type CreateAssignmentForm = z.infer<typeof createAssignmentSchema>;


export const stepOneAssignmentSchema = z.object({
  title: z.string().min(1, 'Assignment name is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  assignmentType: z.string().min(1, 'Assignment type is required'),
});

export const stepTwoAssignmentSchema = z.object({
  institutionCategory: z.string().min(1, 'Institution category is required'),
  department: z.string().min(1, 'Department is required'),
  batches: z.array(z.string()).min(1, 'Select at least one batch'),
});

export const createAssignmentSchema =
  stepOneAssignmentSchema.merge(stepTwoAssignmentSchema);

export type CreateAssignmentForm =
  z.infer<typeof createAssignmentSchema>;
