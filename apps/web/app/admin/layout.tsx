import { Page, PageMobileNavigation, PageNavigation } from '@kit/ui/page';

import { AdminSidebar } from '~/admin/_components/admin-sidebar';
import { AdminMobileNavigation } from '~/admin/_components/mobile-navigation';
import { requireUserInServerComponent } from '~/lib/server/require-user-in-server-component';

export const metadata = {
  title: `Super Admin`,
};

export default async function AdminLayout(props: React.PropsWithChildren) {
  const user = await requireUserInServerComponent();

  return (
    <Page style={'sidebar'}>
      <PageNavigation>
        <AdminSidebar user={user} />
      </PageNavigation>

      <PageMobileNavigation>
        <AdminMobileNavigation />
      </PageMobileNavigation>

      {props.children}
    </Page>
  );
}
