'use server';


import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerActionClient } from '@kit/supabase/server-actions-client';
import { requireUser } from '@kit/supabase/require-user';


import { PersonalContactPhoneSchema } from '../schema/personal-contact-schema';


export const createPersonalContactPhone = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    const auth = await requireUser(client);
    const userId = auth.data?.id;
    const parsedPhoneNumber = PersonalContactPhoneSchema.parse(payload);
    const { data, error } = await client.from('contact_phone_numbers')
      .insert({ ...parsedPhoneNumber, user: userId });

    if (error) {
      console.log(error);

      throw new Error(`Failed to save Content`);
    }
    return data;
  },
  {
    schema: PersonalContactPhoneSchema,
  },
);

