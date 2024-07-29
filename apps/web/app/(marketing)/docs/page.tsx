import { PageBody } from '@kit/ui/page';

import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { withI18n } from '~/lib/i18n/with-i18n';

import { SitePageHeader } from '../_components/site-page-header';
import { DocsCards } from './_components/docs-cards';
import { getDocs } from './_lib/server/docs.loader';

export const generateMetadata = async () => {
  const { t } = await createI18nServerInstance();

  return {
    title: t('marketing:documentation'),
  };
};

async function DocsPage() {
  const { t, resolvedLanguage } = await createI18nServerInstance();
  const items = await getDocs(resolvedLanguage);

  // Filter out any docs that have a parentId, as these are children of other docs
  const cards = items.filter((item) => !item.parentId);

  return (
    <PageBody>
      <div className={'flex flex-col space-y-8 xl:space-y-16'}>
        <SitePageHeader
          title={t('marketing:documentation')}
          subtitle={t('marketing:documentationSubtitle')}
        />

        <div className={'flex flex-col items-center'}>
          <div className={'container mx-auto max-w-5xl'}>
            <DocsCards cards={cards} />
          </div>
        </div>
      </div>
    </PageBody>
  );
}

export default withI18n(DocsPage);
