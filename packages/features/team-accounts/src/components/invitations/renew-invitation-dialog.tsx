import { useState, useTransition } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@kit/ui/alert';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@kit/ui/alert-dialog';
import { Button } from '@kit/ui/button';
import { If } from '@kit/ui/if';
import { Trans } from '@kit/ui/trans';

import { renewInvitationAction } from '../../server/actions/team-invitations-server-actions';

export function RenewInvitationDialog({
  isOpen,
  setIsOpen,
  invitationId,
  email,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  invitationId: number;
  email: string;
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Trans i18nKey="team:renewInvitation" />
          </AlertDialogTitle>

          <AlertDialogDescription>
            <Trans
              i18nKey="team:renewInvitationDialogDescription"
              values={{ email }}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>

        <RenewInvitationForm
          setIsOpen={setIsOpen}
          invitationId={invitationId}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}

function RenewInvitationForm({
  invitationId,
  setIsOpen,
}: {
  invitationId: number;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [isSubmitting, startTransition] = useTransition();
  const [error, setError] = useState<boolean>();

  const inInvitationRenewed = () => {
    startTransition(async () => {
      try {
        await renewInvitationAction({ invitationId });

        setIsOpen(false);
      } catch (e) {
        setError(true);
      }
    });
  };

  return (
    <form action={inInvitationRenewed}>
      <div className={'flex flex-col space-y-6'}>
        <p className={'text-muted-foreground text-sm'}>
          <Trans i18nKey={'common:modalConfirmationQuestion'} />
        </p>

        <If condition={error}>
          <RenewInvitationErrorAlert />
        </If>

        <AlertDialogFooter>
          <AlertDialogCancel>
            <Trans i18nKey={'common:cancel'} />
          </AlertDialogCancel>

          <Button
            data-test={'confirm-renew-invitation'}
            disabled={isSubmitting}
          >
            <Trans i18nKey={'teams:renewInvitation'} />
          </Button>
        </AlertDialogFooter>
      </div>
    </form>
  );
}

function RenewInvitationErrorAlert() {
  return (
    <Alert variant={'destructive'}>
      <AlertTitle>
        <Trans i18nKey={'teams:renewInvitationErrorTitle'} />
      </AlertTitle>

      <AlertDescription>
        <Trans i18nKey={'teams:renewInvitationErrorDescription'} />
      </AlertDescription>
    </Alert>
  );
}
