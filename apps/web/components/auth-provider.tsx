'use client';

import { useCallback } from 'react';

import { useAppEvents } from '@kit/shared/events';
import { useAuthChangeListener } from '@kit/supabase/hooks/use-auth-change-listener';

import pathsConfig from '~/config/paths.config';

export function AuthProvider(props: React.PropsWithChildren) {
  const dispatchEvent = useDispatchAppEventFromAuthEvent();

  useAuthChangeListener({
    appHomePath: pathsConfig.app.home,
    onEvent: (event, session) => {
      dispatchEvent(event, session?.user.id);
    },
  });

  return props.children;
}

function useDispatchAppEventFromAuthEvent() {
  const { emit } = useAppEvents();

  return useCallback(
    (type: string, userId: string | undefined) => {
      switch (type) {
        case 'SIGNED_IN':
          emit({
            type: 'user.signedIn',
            payload: { userId: userId! },
          });

          break;

        case 'USER_UPDATED':
          emit({
            type: 'user.updated',
            payload: { userId: userId! },
          });

          break;
      }
    },
    [emit],
  );
}
