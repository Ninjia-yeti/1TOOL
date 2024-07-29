import 'server-only';

import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';

import type { User } from '@supabase/supabase-js';

import { ZodType, z } from 'zod';

import { verifyCaptchaToken } from '@kit/auth/captcha/server';
import { requireUser } from '@kit/supabase/require-user';
import { getSupabaseServerActionClient } from '@kit/supabase/server-actions-client';

import { captureException, zodParseFactory } from '../utils';

/**
 * @name enhanceAction
 * @description Enhance an action with captcha, schema and auth checks
 */
export function enhanceAction<
  Args,
  Response,
  Config extends {
    auth?: boolean;
    captcha?: boolean;
    captureException?: boolean;
    schema?: z.ZodType<
      Config['captcha'] extends true ? Args & { captchaToken: string } : Args,
      z.ZodTypeDef
    >;
  },
>(
  fn: (
    params: Config['schema'] extends ZodType ? z.infer<Config['schema']> : Args,
    user: Config['auth'] extends false ? undefined : User,
  ) => Response | Promise<Response>,
  config: Config,
) {
  return async (
    params: Config['schema'] extends ZodType ? z.infer<Config['schema']> : Args,
  ) => {
    type UserParam = Config['auth'] extends false ? undefined : User;

    const requireAuth = config.auth ?? true;
    let user: UserParam = undefined as UserParam;

    // validate the schema passed in the config if it exists
    const data = config.schema
      ? zodParseFactory(config.schema)(params)
      : params;

    // by default, the CAPTCHA token is not required
    const verifyCaptcha = config.captcha ?? false;

    // verify the CAPTCHA token. It will throw an error if the token is invalid.
    if (verifyCaptcha) {
      const token = (data as Args & { captchaToken: string }).captchaToken;

      // Verify the CAPTCHA token. It will throw an error if the token is invalid.
      await verifyCaptchaToken(token);
    }

    // verify the user is authenticated if required
    if (requireAuth) {
      // verify the user is authenticated if required
      const auth = await requireUser(getSupabaseServerActionClient());

      // If the user is not authenticated, redirect to the specified URL.
      if (!auth.data) {
        redirect(auth.redirectTo);
      }

      user = auth.data as UserParam;
    }

    // capture exceptions if required
    const shouldCaptureException = config.captureException ?? true;

    // if the action should capture exceptions, wrap the action in a try/catch block
    if (shouldCaptureException) {
      try {
        // pass the data to the action
        return await fn(data, user);
      } catch (error) {
        if (isRedirectError(error)) {
          throw error;
        }

        // capture the exception
        await captureException(error);

        // re-throw the error
        throw error;
      }
    } else {
      // no need to capture exceptions, just pass the data to the action
      return fn(data, user);
    }
  };
}
