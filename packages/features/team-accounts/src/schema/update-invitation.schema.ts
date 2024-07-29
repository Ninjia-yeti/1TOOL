import { z } from 'zod';

export const UpdateInvitationSchema = z.object({
  invitationId: z.number(),
  role: z.string().min(1),
});
