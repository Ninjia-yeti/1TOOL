import { type NextRequest, NextResponse } from 'next/server';

import { type CookieOptions, createServerClient } from '@supabase/ssr';

import { Database } from '../database.types';
import { getSupabaseClientKeys } from '../get-supabase-client-keys';

/**
 * Creates a middleware client for Supabase.
 *
 * @param {NextRequest} request - The Next.js request object.
 * @param {NextResponse} response - The Next.js response object.
 */
export function createMiddlewareClient<GenericSchema = Database>(
  request: NextRequest,
  response: NextResponse,
) {
  const keys = getSupabaseClientKeys();

  return createServerClient<GenericSchema>(keys.url, keys.anonKey, {
    cookies: getCookieStrategy(request, response),
  });
}

function getCookieStrategy(request: NextRequest, response: NextResponse) {
  return {
    set: (name: string, value: string, options: CookieOptions) => {
      request.cookies.set({ name, value, ...options });

      response = NextResponse.next({
        request: {
          headers: request.headers,
        },
      });

      response.cookies.set({
        name,
        value,
        ...options,
      });
    },
    get: (name: string) => {
      return request.cookies.get(name)?.value;
    },
    remove: (name: string, options: CookieOptions) => {
      request.cookies.set({
        name,
        value: '',
        ...options,
      });

      response = NextResponse.next({
        request: {
          headers: request.headers,
        },
      });

      response.cookies.set({
        name,
        value: '',
        ...options,
      });
    },
  };
}
