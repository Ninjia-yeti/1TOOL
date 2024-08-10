'use server';

import { redirect } from 'next/navigation';
import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerActionClient } from '@kit/supabase/server-actions-client';
import { requireUser } from '@kit/supabase/require-user';


import { PersonalContactPhoneSchema, PersonalContactPhoneDeleteSchema } from '../schema/personal-contact-schema';


export const createPersonalContactPhone = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    const auth = await requireUser(client);
    const userId = auth.data?.id;
    const parsedPhoneNumber = PersonalContactPhoneSchema.parse(payload);
    const { data, error } = await client.from('contact_phone_numbers')
      .insert({ ...parsedPhoneNumber, user: userId });
    if (error) {
      throw new Error(`Failed to save Content`);
    }
    return redirect('/home/contact');
  },
  {
    schema: PersonalContactPhoneSchema,
  },
);

export const deletePersonalContactPhone = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    try {
      const response = await client.from('contact_phone_numbers')
        .delete()
        .eq('id', payload.id)
        .select();
      console.log(response);
    } catch (error) {
      if (error) {
        throw new Error(`Failed to delete Content`);
      }
    } finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactPhoneDeleteSchema
  }
)

