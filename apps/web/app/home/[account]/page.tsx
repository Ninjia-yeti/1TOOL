// import loadDynamic from 'next/dynamic';

import { PlusCircle } from 'lucide-react';

import { Button } from '@kit/ui/button';
import { PageBody } from '@kit/ui/page';
// import { Spinner } from '@kit/ui/spinner';
import { Trans } from '@kit/ui/trans';

import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { withI18n } from '~/lib/i18n/with-i18n';

import { TeamAccountLayoutPageHeader } from './_components/team-account-layout-page-header';

// import { Chatbot } from '@kit/chatbot';


interface Params {
  account: string;
}

// const DashboardDemo = loadDynamic(
//   () => import('./_components/dashboard-demo'),
//   {
//     ssr: false,
//     loading: () => (
//       <div
//         className={
//           'flex h-full flex-1 flex-col items-center justify-center space-y-4' +
//           ' py-24'
//         }
//       >
//         <Spinner />

//         <div>
//           <Trans i18nKey={'common:loading'} />
//         </div>
//       </div>
//     ),
//   },
// );

export const generateMetadata = async () => {
  const i18n = await createI18nServerInstance();
  const title = i18n.t('teams:home.pageTitle');

  return {
    title,
  };
};

function TeamAccountHomePage({ params }: { params: Params }) {
  return (
    <>
      <TeamAccountLayoutPageHeader
        account={params.account}
        title={<Trans i18nKey={'common:dashboardTabLabel'} />}
        description={<Trans i18nKey={'common:dashboardTabDescription'} />}
      >
        <Button>
          <PlusCircle className={'mr-1 h-4'} />
          <span>Add Widget</span>
        </Button>
      </TeamAccountLayoutPageHeader>

      <PageBody>
        {/* <DashboardDemo /> */}
        {/* <Chatbot siteName={'Zap Tech'} /> */}
      </PageBody>
    </>
  );
}

export default withI18n(TeamAccountHomePage);
