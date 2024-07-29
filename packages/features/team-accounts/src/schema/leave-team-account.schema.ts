import { z } from 'zod';

export const LeaveTeamAccountSchema = z.object({
  accountId: z.string().uuid(),
  confirmation: z.custom((value) => value === 'LEAVE'),
});
