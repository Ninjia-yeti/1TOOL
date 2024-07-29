import { User } from '@supabase/supabase-js';

import { Sidebar, SidebarContent } from '@kit/ui/sidebar';

import { ProfileAccountDropdownContainer } from '~/components//personal-account-dropdown-container';
import { TeamAccountNotifications } from '~/home/[account]/_components/team-account-notifications';

import { TeamAccountAccountsSelector } from '../_components/team-account-accounts-selector';
import { TeamAccountLayoutSidebarNavigation } from './team-account-layout-sidebar-navigation';

type AccountModel = {
  label: string | null;
  value: string | null;
  image: string | null;
};

export function TeamAccountLayoutSidebar(props: {
  account: string;
  accountId: string;
  accounts: AccountModel[];
  collapsed: boolean;
  user: User;
}) {
  return (
    <Sidebar>
      <SidebarContainer
        account={props.account}
        accountId={props.accountId}
        accounts={props.accounts}
        user={props.user}
      />
    </Sidebar>
  );
}

function SidebarContainer(props: {
  account: string;
  accountId: string;
  accounts: AccountModel[];
  collapsible?: boolean;
  user: User;
}) {
  const { account, accounts, user } = props;
  const userId = user.id;

  return (
    <>
      <SidebarContent className={'h-16 justify-center'}>
        <div
          className={'flex max-w-full items-center justify-between space-x-4'}
        >
          <TeamAccountAccountsSelector
            userId={userId}
            selectedAccount={account}
            accounts={accounts}
          />

          <TeamAccountNotifications
            userId={userId}
            accountId={props.accountId}
          />
        </div>
      </SidebarContent>

      <SidebarContent className={`mt-5 h-[calc(100%-160px)] overflow-y-auto`}>
        <TeamAccountLayoutSidebarNavigation account={account} />
      </SidebarContent>

      <div className={'absolute bottom-4 left-0 w-full'}>
        <SidebarContent>
          <ProfileAccountDropdownContainer
            user={props.user}
            collapsed={false}
          />
        </SidebarContent>
      </div>
    </>
  );
}
