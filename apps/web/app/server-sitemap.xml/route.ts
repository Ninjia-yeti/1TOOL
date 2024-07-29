import { getServerSideSitemap } from 'next-sitemap';

import { createCmsClient } from '@kit/cms';

import appConfig from '~/config/app.config';

export async function GET() {
  const paths = getPaths();
  const contentItems = await getContentItems();

  return getServerSideSitemap([
    ...paths,
    ...contentItems.map((path) => {
      return {
        loc: new URL(path, appConfig.url).href,
        lastmod: new Date().toISOString(),
      };
    }),
  ]);
}

function getPaths() {
  const paths = [
    '/',
    '/faq',
    '/blog',
    '/docs',
    '/pricing',
    '/contact',
    '/cookie-policy',
    '/terms-of-service',
    '/privacy-policy',
    // add more paths here
  ];

  return paths.map((path) => {
    return {
      loc: new URL(path, appConfig.url).href,
      lastmod: new Date().toISOString(),
    };
  });
}

async function getContentItems() {
  const client = await createCmsClient();

  const posts = client
    .getContentItems({
      collection: 'posts',
    })
    .then((response) => response.items)
    .then((posts) => posts.map((post) => `/blog/${post.slug}`));

  const docs = client
    .getContentItems({
      collection: 'documentation',
    })
    .then((response) => response.items)
    .then((docs) => docs.map((doc) => `/docs/${doc.slug}`));

  return Promise.all([posts, docs]).then((items) => items.flat());
}
