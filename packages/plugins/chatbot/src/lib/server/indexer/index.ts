import { SupabaseClient } from '@supabase/supabase-js';

import { Database } from '@kit/supabase/database';

import { createDocumentIndexerService } from '../services/document-indexer.service';
import { createChatbotCrawler } from './chatbot-crawler';

/**
 * Run the chatbot indexer.
 * @param client
 * @param params
 */
export async function runChatbotIndexer(
  client: SupabaseClient<Database>,
  params: {
    url: string;
    allow: string[];
    disallow: string[];
  },
) {
  const crawler = createChatbotCrawler();
  const documentIndexerService = createDocumentIndexerService();

  const links = await crawler.getSitemapLinks(params.url);

  return documentIndexerService.indexDocuments({
    client,
    body: {
      links,
      allow: params.allow,
      disallow: params.disallow,
    },
  });
}
