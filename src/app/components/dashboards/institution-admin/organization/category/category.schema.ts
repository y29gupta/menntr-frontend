import { z } from "zod";

export const categorySchema = z.object({
   id: z.string().optional(), 
  name: z.string().min(2, "Category name is required"),
  code: z.string().min(2, "Category code is required"),
  assignedUserId: z.string().min(1, "Please assign a category"),
  departments: z.array(z.string()).min(1, "Select at least one department"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
