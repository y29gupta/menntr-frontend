
import {z} from 'zod'
export const studentSetupFormSchema = z.object({
    program: z.string("Pragram is required").min(1, ),
    department: z.string("Please select the department").min(1, ),
    batchId: z.string("Please select the Batch").min(1),
    academicYear: z.string("Please select the year").min(1),
    section:z.string("Please select the section")
})

export type studentSetupFormValue=z.infer<typeof studentSetupFormSchema>