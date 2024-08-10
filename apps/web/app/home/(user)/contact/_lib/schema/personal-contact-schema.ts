import { z } from 'zod';

export const PersonalContactPhoneSchema = z.object({
  number: z.string().min(1),
  type: z.string().min(1),
});
export const PersonalContactPhoneDeleteSchema = z.object({
  id: z.number()
});
