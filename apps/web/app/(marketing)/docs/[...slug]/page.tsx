import { cache } from 'react';

import { notFound } from 'next/navigation';

import { ContentRenderer, createCmsClient } from '@kit/cms';
import { If } from '@kit/ui/if';
import { Separator } from '@kit/ui/separator';

import { withI18n } from '~/lib/i18n/with-i18n';

import { SitePageHeader } from '../../_components/site-page-header';
import styles from '../../blog/_components/html-renderer.module.css';
import { DocsCards } from '../_components/docs-cards';

const getPageBySlug = cache(pageLoader);

async function pageLoader(slug: string) {
  const client = await createCmsClient();

  return client.getContentItemBySlug({ slug, collection: 'documentation' });
}

interface PageParams {
  params: {
    slug: string[];
  };
}

export const generateMetadata = async ({ params }: PageParams) => {
  const page = await getPageBySlug(params.slug.join('/'));

  if (!page) {
    notFound();
  }

  const { title, description } = page;

  return {
    title,
    description,
  };
};

async function DocumentationPage({ params }: PageParams) {
  const page = await getPageBySlug(params.slug.join('/'));

  if (!page) {
    notFound();
  }

  const description = page?.description ?? '';

  return (
    <div className={'flex flex-1 flex-col'}>
      <SitePageHeader title={page.title} subtitle={description} />

      <div className={'container flex max-w-5xl flex-col space-y-4 py-6'}>
        <article className={styles.HTML}>
          <ContentRenderer content={page.content} />
        </article>

        <If condition={page.children.length > 0}>
          <Separator />

          <DocsCards cards={page.children ?? []} />
        </If>
      </div>
    </div>
  );
}

export default withI18n(DocumentationPage);
