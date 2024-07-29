import { z } from 'zod';

export const RoleSchema = z.object({
  role: z.string().min(1),
});

export const UpdateMemberRoleSchema = RoleSchema.extend({
  accountId: z.string().uuid(),
  userId: z.string().uuid(),
});
