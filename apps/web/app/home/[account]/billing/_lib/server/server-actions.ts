'use server';

import { redirect } from 'next/navigation';

import { enhanceAction } from '@kit/next/actions';
import { getSupabaseServerActionClient } from '@kit/supabase/server-actions-client';

import featureFlagsConfig from '~/config/feature-flags.config';

// billing imports
import {
  TeamBillingPortalSchema,
  TeamCheckoutSchema,
} from '../schema/team-billing.schema';
import { createTeamBillingService } from './team-billing.service';

/**
 * @name enabled
 * @description This feature flag is used to enable or disable team account billing.
 */
const enabled = featureFlagsConfig.enableTeamAccountBilling;

/**
 * @name createTeamAccountCheckoutSession
 * @description Creates a checkout session for a team account.
 */
export const createTeamAccountCheckoutSession = enhanceAction(
  (data) => {
    if (!enabled) {
      throw new Error('Team account billing is not enabled');
    }

    const client = getSupabaseServerActionClient();
    const service = createTeamBillingService(client);

    return service.createCheckout(data);
  },
  {
    schema: TeamCheckoutSchema,
  },
);

/**
 * @name createBillingPortalSession
 * @description Creates a Billing Session Portal and redirects the user to the
 * provider's hosted instance
 */
export const createBillingPortalSession = enhanceAction(
  async (formData: FormData) => {
    if (!enabled) {
      throw new Error('Team account billing is not enabled');
    }

    const params = TeamBillingPortalSchema.parse(Object.fromEntries(formData));

    const client = getSupabaseServerActionClient();
    const service = createTeamBillingService(client);

    // get url to billing portal
    const url = await service.createBillingPortalSession(params);

    return redirect(url);
  },
  {},
);
