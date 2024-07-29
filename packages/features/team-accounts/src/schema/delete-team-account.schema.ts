import { z } from 'zod';

export const DeleteTeamAccountSchema = z.object({
  accountId: z.string().uuid(),
});
