import { z } from 'zod';

export const JobFilterFormSchema = z.object({
    q: z.string().optional(),
    type: z.string().optional(),
    location: z.string().optional(),
    remote: z.coerce.boolean().optional(),
});

export type JobFilterFormType = z.infer<typeof JobFilterFormSchema>;
