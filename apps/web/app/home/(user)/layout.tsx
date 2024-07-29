import { use } from 'react';

import { cookies } from 'next/headers';

import { UserWorkspaceContextProvider } from '@kit/accounts/components';
import { If } from '@kit/ui/if';
import {
  Page,
  PageLayoutStyle,
  PageMobileNavigation,
  PageNavigation,
} from '@kit/ui/page';

import { AppLogo } from '~/components/app-logo';
import { personalAccountNavigationConfig } from '~/config/personal-account-navigation.config';
import { withI18n } from '~/lib/i18n/with-i18n';

// home imports
import { HomeMenuNavigation } from './_components/home-menu-navigation';
import { HomeMobileNavigation } from './_components/home-mobile-navigation';
import { HomeSidebar } from './_components/home-sidebar';
import { loadUserWorkspace } from './_lib/server/load-user-workspace';

function UserHomeLayout({ children }: React.PropsWithChildren) {
  const workspace = use(loadUserWorkspace());
  const style = getLayoutStyle();

  return (
    <Page style={style}>
      <PageNavigation>
        <If condition={style === 'header'}>
          <HomeMenuNavigation workspace={workspace} />
        </If>

        <If condition={style === 'sidebar'}>
          <HomeSidebar workspace={workspace} />
        </If>
      </PageNavigation>

      <PageMobileNavigation className={'flex items-center justify-between'}>
        <AppLogo />
        <HomeMobileNavigation workspace={workspace} />
      </PageMobileNavigation>

      <UserWorkspaceContextProvider value={workspace}>
        {children}
      </UserWorkspaceContextProvider>
    </Page>
  );
}

export default withI18n(UserHomeLayout);

function getLayoutStyle() {
  return (
    (cookies().get('layout-style')?.value as PageLayoutStyle) ??
    personalAccountNavigationConfig.style
  );
}
