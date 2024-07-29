import { z } from 'zod';

export const RenewInvitationSchema = z.object({
  invitationId: z.number().positive(),
});
