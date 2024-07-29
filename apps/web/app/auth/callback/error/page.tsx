import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Alert, AlertDescription, AlertTitle } from '@kit/ui/alert';
import { Button } from '@kit/ui/button';
import { Trans } from '@kit/ui/trans';

import pathsConfig from '~/config/paths.config';
import { withI18n } from '~/lib/i18n/with-i18n';

interface Params {
  searchParams: {
    error: string;
    invite_token: string;
  };
}

function AuthCallbackErrorPage({ searchParams }: Params) {
  const { error, invite_token } = searchParams;
  const queryParam = invite_token ? `?invite_token=${invite_token}` : '';
  const signInPath = pathsConfig.auth.signIn + queryParam;

  // if there is no error, redirect the user to the sign-in page
  if (!error) {
    redirect(signInPath);
  }

  return (
    <div className={'flex flex-col space-y-4 py-4'}>
      <div>
        <Alert variant={'destructive'}>
          <AlertTitle>
            <Trans i18nKey={'auth:authenticationErrorAlertHeading'} />
          </AlertTitle>

          <AlertDescription>
            <Trans i18nKey={error} />
          </AlertDescription>
        </Alert>
      </div>

      <Button asChild>
        <Link href={signInPath}>
          <Trans i18nKey={'auth:signIn'} />
        </Link>
      </Button>
    </div>
  );
}

export default withI18n(AuthCallbackErrorPage);
