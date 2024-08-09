
import { PageBody } from '@kit/ui/page';
import { Trans } from '@kit/ui/trans';

import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { withI18n } from '~/lib/i18n/with-i18n';

// local imports
import { HomeLayoutPageHeader } from '../_components/home-page-header';
import { PersonalContactContainer } from './_components/personal-contact-container';

export const generateMetadata = async () => {
  const i18n = await createI18nServerInstance();
  const title = i18n.t('contact:contactTab');

  return {
    title,
  };
};


async function PersonalContactsPage() {

  return (
    <>
      <HomeLayoutPageHeader
        title={<Trans i18nKey={'contact:contactTabLabel'} />}
        description={<Trans i18nKey={'contact:contactTabDescription'} />}
      />
      <PageBody>
        <PersonalContactContainer />
      </PageBody>
    </>
  );
}

export default withI18n(PersonalContactsPage);

