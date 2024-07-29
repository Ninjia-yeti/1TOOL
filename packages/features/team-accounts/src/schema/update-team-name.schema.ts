import { z } from 'zod';

export const TeamNameFormSchema = z.object({
  name: z.string().min(1).max(255),
});

export const UpdateTeamNameSchema = TeamNameFormSchema.merge(
  z.object({
    slug: z.string().min(1).max(255),
    path: z.string().min(1).max(255),
  }),
);
