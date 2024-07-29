'use server';

import { revalidatePath } from 'next/cache';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerActionClient } from '@kit/supabase/server-actions-client';

import { RemoveMemberSchema } from '../../schema/remove-member.schema';
import { TransferOwnershipConfirmationSchema } from '../../schema/transfer-ownership-confirmation.schema';
import { UpdateMemberRoleSchema } from '../../schema/update-member-role.schema';
import { createAccountMembersService } from '../services/account-members.service';

/**
 * @name removeMemberFromAccountAction
 * @description Removes a member from an account.
 */
export const removeMemberFromAccountAction = enhanceAction(
  async ({ accountId, userId }) => {
    const client = getSupabaseServerActionClient();
    const service = createAccountMembersService(client);

    await service.removeMemberFromAccount({
      accountId,
      userId,
    });

    // revalidate all pages that depend on the account
    revalidatePath('/home/[account]', 'layout');

    return { success: true };
  },
  {
    schema: RemoveMemberSchema,
  },
);

/**
 * @name updateMemberRoleAction
 * @description Updates the role of a member in an account.
 */
export const updateMemberRoleAction = enhanceAction(
  async (data) => {
    const client = getSupabaseServerActionClient();
    const service = createAccountMembersService(client);
    const adminClient = getSupabaseServerActionClient({ admin: true });

    // update the role of the member
    await service.updateMemberRole(data, adminClient);

    // revalidate all pages that depend on the account
    revalidatePath('/home/[account]', 'layout');

    return { success: true };
  },
  {
    schema: UpdateMemberRoleSchema,
  },
);

/**
 * @name transferOwnershipAction
 * @description Transfers the ownership of an account to another member.
 */
export const transferOwnershipAction = enhanceAction(
  async (data) => {
    const client = getSupabaseServerActionClient();

    // assert that the user is the owner of the account
    const { data: isOwner, error } = await client.rpc('is_account_owner', {
      account_id: data.accountId,
    });

    if (error ?? !isOwner) {
      throw new Error(
        `You must be the owner of the account to transfer ownership`,
      );
    }

    const service = createAccountMembersService(client);

    // at this point, the user is authenticated and is the owner of the account
    // so we proceed with the transfer of ownership with admin privileges
    const adminClient = getSupabaseServerActionClient({ admin: true });

    // transfer the ownership of the account
    await service.transferOwnership(data, adminClient);

    // revalidate all pages that depend on the account
    revalidatePath('/home/[account]', 'layout');

    return {
      success: true,
    };
  },
  {
    schema: TransferOwnershipConfirmationSchema,
  },
);
