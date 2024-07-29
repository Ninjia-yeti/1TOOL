'use client';

import { useState } from 'react';

import { CreateTeamAccountDialog } from '@kit/team-accounts/components';
import { Button } from '@kit/ui/button';
import { Trans } from '@kit/ui/trans';

export function HomeAddAccountButton() {
  const [isAddingAccount, setIsAddingAccount] = useState(false);

  return (
    <>
      <Button size="sm" onClick={() => setIsAddingAccount(true)}>
        <Trans i18nKey={'account:createTeamButtonLabel'} />
      </Button>

      <CreateTeamAccountDialog
        isOpen={isAddingAccount}
        setIsOpen={setIsAddingAccount}
      />
    </>
  );
}
