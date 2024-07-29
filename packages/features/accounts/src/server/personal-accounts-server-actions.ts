'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { z } from 'zod';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerActionClient } from '@kit/supabase/server-actions-client';

import { DeletePersonalAccountSchema } from '../schema/delete-personal-account.schema';
import { createDeletePersonalAccountService } from './services/delete-personal-account.service';

const emailSettings = getEmailSettingsFromEnvironment();

export async function refreshAuthSession() {
  const client = getSupabaseServerActionClient();

  await client.auth.refreshSession();

  return {};
}

export const deletePersonalAccountAction = enhanceAction(
  async (formData: FormData, user) => {
    // validate the form data
    const { success } = DeletePersonalAccountSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );

    if (!success) {
      throw new Error('Invalid form data');
    }

    const client = getSupabaseServerActionClient();

    // create a new instance of the personal accounts service
    const service = createDeletePersonalAccountService();

    // sign out the user before deleting their account
    await client.auth.signOut();

    // delete the user's account and cancel all subscriptions
    await service.deletePersonalAccount({
      adminClient: getSupabaseServerActionClient({ admin: true }),
      userId: user.id,
      userEmail: user.email ?? null,
      emailSettings,
    });

    // clear the cache for all pages
    revalidatePath('/', 'layout');

    // redirect to the home page
    redirect('/');
  },
  {},
);

function getEmailSettingsFromEnvironment() {
  return z
    .object({
      fromEmail: z
        .string({
          required_error: 'Provide the variable EMAIL_SENDER',
        })
        .email(),
      productName: z
        .string({
          required_error: 'Provide the variable NEXT_PUBLIC_PRODUCT_NAME',
        })
        .min(1),
    })
    .parse({
      fromEmail: process.env.EMAIL_SENDER,
      productName: process.env.NEXT_PUBLIC_PRODUCT_NAME,
    });
}
