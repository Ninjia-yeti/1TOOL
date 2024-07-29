import { z } from 'zod';

export const RemoveMemberSchema = z.object({
  accountId: z.string().uuid(),
  userId: z.string().uuid(),
});
