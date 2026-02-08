import { z } from "zod";

const programSchema = z.object({
  program_code: z.string().min(1, "Program code is required"),
  program_name: z.string().min(1, "Program name is required"),
});

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Category name is required"),
  code: z.string().min(2, "Category code is required"),
  programs: z.array(programSchema).max(1, "Each category can have only one program"),
  // assignedUserId and departments removed - users can be assigned separately
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
