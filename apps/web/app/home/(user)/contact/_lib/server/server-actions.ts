'use server';

import { redirect } from 'next/navigation';
import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerActionClient } from '@kit/supabase/server-actions-client';
import { requireUser } from '@kit/supabase/require-user';


import {
  PersonalContactPhoneSchema,
  PersonalContactPhoneDeleteSchema,
  PersonalContactPhoneEditSchema,
  PersonalContactAddressSchema
} from '../schema/personal-contact-schema';


export const createPersonalContactPhone = enhanceAction(
  async function (payload) {
    const client = getSupabaseServerActionClient();
    const auth = await requireUser(client);
    const userId = auth.data?.id;
    try {
      const { error } = await client.from('contact_phone_numbers')
        .insert(
          {
            number: payload.number,
            type: payload.type,
            user: userId
          }
        );
      if (error) {
        throw new Error(`Failed to save number`);
      }
    }
    catch (error) {
      throw new Error(`Failed to save number error:${error}`);
    }
    finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactPhoneSchema,
  },
);
export const editPersonalContactPhone = enhanceAction(
  async function (payload) {
    const client = getSupabaseServerActionClient();
    try {
      const { error } = await client.from('contact_phone_numbers')
        .update({
          number: payload.number,
          type: payload.type
        })
        .eq('id', payload.id)
      if (error) {
        throw new Error(`Failed to edit number`);
      }
    }
    catch (error) {
      throw new Error(`Failed to edit number error:${error}`);
    }
    finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactPhoneEditSchema,
  },
);

export const deletePersonalContactPhone = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    try {
      const { data, error } = await client.from('contact_phone_numbers')
        .delete()
        .eq('id', payload.id)
        .select();
      if (error) {
        throw new Error(`Failed to delete number`);
      }
    } catch (error) {
      throw new Error(`Failed to delete number. error:${error}`);
    } finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactPhoneDeleteSchema
  }
)

export const createPersonalContactAddress = enhanceAction(
  async function (payload) {

    const client = getSupabaseServerActionClient();
    const auth = await requireUser(client);
    const userId = auth.data?.id;
    try {
      console.log({
        ...payload,
        user: userId
      });

      const { error } = await client.from('contact_addresses')
        .insert(
          {
            ...payload,
            countrys: '',
            user: userId
          }
        );

      if (error) {
        throw new Error(error.message);
      }
    }
    catch (error) {
      throw new Error(`Failed to save address error:${error}`);
    }
    finally {
      return redirect('/home/contact');
    }
  },
  {
    schema: PersonalContactAddressSchema,
  },
);

