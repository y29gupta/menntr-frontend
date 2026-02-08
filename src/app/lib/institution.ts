import { z } from 'zod';

export const institutionSchema = z.object({
  name: z.string().min(1, 'Institution name is required'),

  code: z.string().min(1, 'Institution code is required'),
  subdomain: z.string().min(1, 'Sub Domain is required'),

  contact_email: z.string().min(1, 'Contact email is required').email('Invalid email address'),

  plan_id: z.string().min(1, 'Plan is required'),
});

export type InstitutionFormValues = z.infer<typeof institutionSchema>;
