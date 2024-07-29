'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useSupabase } from '@kit/supabase/hooks/use-supabase';

function AuthLinkRedirect(props: { redirectPath?: string }) {
  const params = useSearchParams();

  const redirectPath = params?.get('redirectPath') ?? props.redirectPath ?? '/';

  useRedirectOnSignIn(redirectPath);

  return null;
}

export default AuthLinkRedirect;

function useRedirectOnSignIn(redirectPath: string) {
  const supabase = useSupabase();
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        router.push(redirectPath);
      }
    });

    return () => data.subscription.unsubscribe();
  }, [supabase, router, redirectPath]);
}
