import { use } from 'react';

import { cookies } from 'next/headers';

import { TeamAccountWorkspaceContextProvider } from '@kit/team-accounts/components';
import { If } from '@kit/ui/if';
import {
  Page,
  PageLayoutStyle,
  PageMobileNavigation,
  PageNavigation,
} from '@kit/ui/page';

import { AppLogo } from '~/components/app-logo';
import { getTeamAccountSidebarConfig } from '~/config/team-account-navigation.config';
import { withI18n } from '~/lib/i18n/with-i18n';

// local imports
import { TeamAccountLayoutMobileNavigation } from './_components/team-account-layout-mobile-navigation';
import { TeamAccountLayoutSidebar } from './_components/team-account-layout-sidebar';
import { TeamAccountNavigationMenu } from './_components/team-account-navigation-menu';
import { loadTeamWorkspace } from './_lib/server/team-account-workspace.loader';

interface Params {
  account: string;
}

function TeamWorkspaceLayout({
  children,
  params,
}: React.PropsWithChildren<{
  params: Params;
}>) {
  const data = use(loadTeamWorkspace(params.account));
  const style = getLayoutStyle(params.account);

  const accounts = data.accounts.map(({ name, slug, picture_url }) => ({
    label: name,
    value: slug,
    image: picture_url,
  }));

  return (
    <Page style={style}>
      <PageNavigation>
        <If condition={style === 'sidebar'}>
          <TeamAccountLayoutSidebar
            collapsed={false}
            account={params.account}
            accountId={data.account.id}
            accounts={accounts}
            user={data.user}
          />
        </If>

        <If condition={style === 'header'}>
          <TeamAccountNavigationMenu workspace={data} />
        </If>
      </PageNavigation>

      <PageMobileNavigation className={'flex items-center justify-between'}>
        <AppLogo />

        <div className={'flex space-x-4'}>
          <TeamAccountLayoutMobileNavigation
            userId={data.user.id}
            accounts={accounts}
            account={params.account}
          />
        </div>
      </PageMobileNavigation>

      <TeamAccountWorkspaceContextProvider value={data}>
        {children}
      </TeamAccountWorkspaceContextProvider>
    </Page>
  );
}

function getLayoutStyle(account: string) {
  return (
    (cookies().get('layout-style')?.value as PageLayoutStyle) ??
    getTeamAccountSidebarConfig(account).style
  );
}

export default withI18n(TeamWorkspaceLayout);
