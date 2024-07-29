import { z } from 'zod';

const InviteSchema = z.object({
  email: z.string().email(),
  role: z.string().min(1).max(100),
});

export const InviteMembersSchema = z
  .object({
    invitations: InviteSchema.array().min(1).max(5),
  })
  .refine(
    (data) => {
      const emails = data.invitations.map((member) =>
        member.email.toLowerCase(),
      );

      const uniqueEmails = new Set(emails);

      return emails.length === uniqueEmails.size;
    },
    {
      message: 'Duplicate emails are not allowed',
      path: ['invitations'],
    },
  );
