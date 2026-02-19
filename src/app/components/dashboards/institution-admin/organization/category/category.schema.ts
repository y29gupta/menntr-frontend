import { z } from 'zod';

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Category name is required'),
  code: z.string().min(2, 'Category code is required'),
  assignedUserId: z.string().min(1, 'User is required'),
  programs: z
    .array(z.string().min(1, 'Program name is required'))
    .min(1, 'At least one program is required'),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
