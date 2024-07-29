import { UpdatePasswordForm } from '@kit/auth/password-reset';
import { AuthLayoutShell } from '@kit/auth/shared';

import { AppLogo } from '~/components/app-logo';
import pathsConfig from '~/config/paths.config';
import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { withI18n } from '~/lib/i18n/with-i18n';
import { requireUserInServerComponent } from '~/lib/server/require-user-in-server-component';

export const generateMetadata = async () => {
  const { t } = await createI18nServerInstance();

  return {
    title: t('auth:updatePassword'),
  };
};

async function UpdatePasswordPage() {
  await requireUserInServerComponent();

  return (
    <AuthLayoutShell Logo={AppLogo}>
      <UpdatePasswordForm redirectTo={pathsConfig.app.home} />
    </AuthLayoutShell>
  );
}

export default withI18n(UpdatePasswordPage);
