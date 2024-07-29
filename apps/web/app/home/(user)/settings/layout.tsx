import { Trans } from '@kit/ui/trans';

import { withI18n } from '~/lib/i18n/with-i18n';

// local imports
import { HomeLayoutPageHeader } from '../_components/home-page-header';

function UserSettingsLayout(props: React.PropsWithChildren) {
  return (
    <>
      <HomeLayoutPageHeader
        title={<Trans i18nKey={'account:accountTabLabel'} />}
        description={<Trans i18nKey={'account:accountTabDescription'} />}
      />

      {props.children}
    </>
  );
}

export default withI18n(UserSettingsLayout);
