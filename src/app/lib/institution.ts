import { z } from "zod";

export const institutionSchema = z.object({
  name: z
    .string()
    .min(1, 'Institution name is required'),

  code: z
    .string()
    .min(1, 'Institution code is required'),

  contactEmail: z
    .string()
    .min(1, 'Contact email is required')
    .email('Invalid email address'),

  plan: z.enum(['BASIC', 'PREMIUM']),
});


export type InstitutionFormValues = z.infer<
  typeof institutionSchema
>;
