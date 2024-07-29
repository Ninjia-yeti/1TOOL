'use client';

import { useContext } from 'react';

import { UserWorkspaceContext } from '../components';

export function useUserWorkspace() {
  const ctx = useContext(UserWorkspaceContext);

  if (!ctx) {
    throw new Error(
      'useUserWorkspace must be used within a UserWorkspaceProvider. This is only provided within the user workspace /home',
    );
  }

  return ctx;
}
