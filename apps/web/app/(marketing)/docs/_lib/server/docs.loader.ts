import { cache } from 'react';

import { createCmsClient } from '@kit/cms';
import { getLogger } from '@kit/shared/logger';

/**
 * @name getDocs
 * @description Load the documentation pages.
 * @param language
 */
export const getDocs = cache(docsLoader);

async function docsLoader(language: string | undefined) {
  const cms = await createCmsClient();
  const logger = await getLogger();

  try {
    const data = await cms.getContentItems({
      collection: 'documentation',
      language,
      limit: 500,
    });

    return data.items;
  } catch (error) {
    logger.error({ error }, 'Failed to load documentation pages');

    return [];
  }
}
