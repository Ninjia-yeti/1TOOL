import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Alert, AlertDescription, AlertTitle } from '@kit/ui/alert';
import { Button } from '@kit/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@kit/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@kit/ui/form';
import { If } from '@kit/ui/if';
import { Trans } from '@kit/ui/trans';

import { RoleSchema } from '../../schema/update-member-role.schema';
import { updateInvitationAction } from '../../server/actions/team-invitations-server-actions';
import { MembershipRoleSelector } from '../members/membership-role-selector';
import { RolesDataProvider } from '../members/roles-data-provider';

type Role = string;

export function UpdateInvitationDialog({
  isOpen,
  setIsOpen,
  invitationId,
  userRole,
  userRoleHierarchy,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  invitationId: number;
  userRole: Role;
  userRoleHierarchy: number;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Trans i18nKey={'teams:updateMemberRoleModalHeading'} />
          </DialogTitle>

          <DialogDescription>
            <Trans i18nKey={'teams:updateMemberRoleModalDescription'} />
          </DialogDescription>
        </DialogHeader>

        <UpdateInvitationForm
          invitationId={invitationId}
          userRole={userRole}
          userRoleHierarchy={userRoleHierarchy}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

function UpdateInvitationForm({
  invitationId,
  userRole,
  userRoleHierarchy,
  setIsOpen,
}: React.PropsWithChildren<{
  invitationId: number;
  userRole: Role;
  userRoleHierarchy: number;
  setIsOpen: (isOpen: boolean) => void;
}>) {
  const { t } = useTranslation('teams');
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<boolean>();

  const onSubmit = ({ role }: { role: Role }) => {
    startTransition(async () => {
      try {
        await updateInvitationAction({
          invitationId,
          role,
        });

        setIsOpen(false);
      } catch (e) {
        setError(true);
      }
    });
  };

  const form = useForm({
    resolver: zodResolver(
      RoleSchema.refine(
        (data) => {
          return data.role !== userRole;
        },
        {
          message: t('roleMustBeDifferent'),
          path: ['role'],
        },
      ),
    ),
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: {
      role: userRole,
    },
  });

  return (
    <Form {...form}>
      <form
        data-test={'update-invitation-form'}
        onSubmit={form.handleSubmit(onSubmit)}
        className={'flex flex-col space-y-6'}
      >
        <If condition={error}>
          <UpdateRoleErrorAlert />
        </If>

        <FormField
          name={'role'}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  <Trans i18nKey={'teams:roleLabel'} />
                </FormLabel>

                <FormControl>
                  <RolesDataProvider maxRoleHierarchy={userRoleHierarchy}>
                    {(roles) => (
                      <MembershipRoleSelector
                        roles={roles}
                        currentUserRole={userRole}
                        value={field.value}
                        onChange={(newRole) =>
                          form.setValue(field.name, newRole)
                        }
                      />
                    )}
                  </RolesDataProvider>
                </FormControl>

                <FormDescription>
                  <Trans i18nKey={'teams:updateRoleDescription'} />
                </FormDescription>

                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button type={'submit'} disabled={pending}>
          <Trans i18nKey={'teams:updateRoleSubmitLabel'} />
        </Button>
      </form>
    </Form>
  );
}

function UpdateRoleErrorAlert() {
  return (
    <Alert variant={'destructive'}>
      <AlertTitle>
        <Trans i18nKey={'teams:updateRoleErrorHeading'} />
      </AlertTitle>

      <AlertDescription>
        <Trans i18nKey={'teams:updateRoleErrorMessage'} />
      </AlertDescription>
    </Alert>
  );
}
