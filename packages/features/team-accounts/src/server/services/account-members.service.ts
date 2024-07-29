import 'server-only';

import { SupabaseClient } from '@supabase/supabase-js';

import { z } from 'zod';

import { getLogger } from '@kit/shared/logger';
import { Database } from '@kit/supabase/database';

import { RemoveMemberSchema } from '../../schema/remove-member.schema';
import { TransferOwnershipConfirmationSchema } from '../../schema/transfer-ownership-confirmation.schema';
import { UpdateMemberRoleSchema } from '../../schema/update-member-role.schema';
import { createAccountPerSeatBillingService } from './account-per-seat-billing.service';

export function createAccountMembersService(client: SupabaseClient<Database>) {
  return new AccountMembersService(client);
}

class AccountMembersService {
  private readonly namespace = 'account-members';

  constructor(private readonly client: SupabaseClient<Database>) {}

  /**
   * @name removeMemberFromAccount
   * @description Removes a member from an account.
   * @param params
   */
  async removeMemberFromAccount(params: z.infer<typeof RemoveMemberSchema>) {
    const logger = await getLogger();

    const ctx = {
      namespace: this.namespace,
      ...params,
    };

    logger.info(ctx, `Removing member from account...`);

    const { data, error } = await this.client
      .from('accounts_memberships')
      .delete()
      .match({
        account_id: params.accountId,
        user_id: params.userId,
      });

    if (error) {
      logger.error(
        {
          ...ctx,
          error,
        },
        `Failed to remove member from account`,
      );

      throw error;
    }

    logger.info(
      ctx,
      `Successfully removed member from account. Verifying seat count...`,
    );

    const service = createAccountPerSeatBillingService(this.client);

    await service.decreaseSeats(params.accountId);

    return data;
  }

  /**
   * @name updateMemberRole
   * @description Updates the role of a member in an account.
   * @param params
   * @param adminClient
   */
  async updateMemberRole(
    params: z.infer<typeof UpdateMemberRoleSchema>,
    adminClient: SupabaseClient<Database>,
  ) {
    const logger = await getLogger();

    const ctx = {
      namespace: this.namespace,
      ...params,
    };

    logger.info(ctx, `Validating permissions to update member role...`);

    const { data: canActionAccountMember, error: accountError } =
      await this.client.rpc('can_action_account_member', {
        target_user_id: params.userId,
        target_team_account_id: params.accountId,
      });

    if (accountError ?? !canActionAccountMember) {
      logger.error(
        {
          ...ctx,
          accountError,
        },
        `Failed to validate permissions to update member role`,
      );

      throw new Error(`Failed to validate permissions to update member role`);
    }

    logger.info(ctx, `Permissions validated. Updating member role...`);

    // we use the Admin client to update the role
    // since we do not set any RLS policies on the accounts_memberships table
    // for updating accounts_memberships. Instead, we use the can_action_account_member
    // RPC to validate permissions to update the role
    const { data, error } = await adminClient
      .from('accounts_memberships')
      .update({
        account_role: params.role,
      })
      .match({
        account_id: params.accountId,
        user_id: params.userId,
      });

    if (error) {
      logger.error(
        {
          ...ctx,
          error,
        },
        `Failed to update member role`,
      );

      throw error;
    }

    logger.info(ctx, `Successfully updated member role`);

    return data;
  }

  /**
   * @name transferOwnership
   * @description Transfers ownership of an account to another user.
   * @param params
   * @param adminClient
   */
  async transferOwnership(
    params: z.infer<typeof TransferOwnershipConfirmationSchema>,
    adminClient: SupabaseClient<Database>,
  ) {
    const logger = await getLogger();

    const ctx = {
      namespace: this.namespace,
      ...params,
    };

    logger.info(ctx, `Transferring ownership of account...`);

    const { data, error } = await adminClient.rpc(
      'transfer_team_account_ownership',
      {
        target_account_id: params.accountId,
        new_owner_id: params.userId,
      },
    );

    if (error) {
      logger.error(
        { ...ctx, error },
        `Failed to transfer ownership of account`,
      );

      throw error;
    }

    logger.info(ctx, `Successfully transferred ownership of account`);

    return data;
  }
}
