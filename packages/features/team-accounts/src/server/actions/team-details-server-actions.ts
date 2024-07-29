'use server';

import { redirect } from 'next/navigation';

import { enhanceAction } from '@kit/next/actions';
import { getLogger } from '@kit/shared/logger';
import { getSupabaseServerActionClient } from '@kit/supabase/server-actions-client';

import { UpdateTeamNameSchema } from '../../schema/update-team-name.schema';

export const updateTeamAccountName = enhanceAction(
  async (params) => {
    const client = getSupabaseServerActionClient();
    const logger = await getLogger();
    const { name, path, slug } = params;

    const ctx = {
      name: 'team-accounts.update',
      accountName: name,
    };

    logger.info(ctx, `Updating team name...`);

    const { error, data } = await client
      .from('accounts')
      .update({
        name,
        slug,
      })
      .match({
        slug,
      })
      .select('slug')
      .single();

    if (error) {
      logger.error({ ...ctx, error }, `Failed to update team name`);

      throw error;
    }

    const newSlug = data.slug;

    logger.info(ctx, `Team name updated`);

    if (newSlug) {
      const nextPath = path.replace('[account]', newSlug);

      redirect(nextPath);
    }

    return { success: true };
  },
  {
    schema: UpdateTeamNameSchema,
  },
);
