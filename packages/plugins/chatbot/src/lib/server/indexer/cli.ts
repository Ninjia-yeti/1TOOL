/*
 * This script is used to index a website for the chatbot.
 * It will crawl the website and index all the pages.
 * Usage: npx tsx cli.js --url --include --exclude
 * Example: npx tsx cli.js --url https://example.com --include / --exclude /admin
 */
import { createClient } from '@supabase/supabase-js';

import { config } from 'dotenv';

import { runChatbotIndexer } from './index';

// load environment variables
const env = config({
  path: '.env.local',
});

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  let url: string | undefined = undefined;
  let allow: string[] = [];
  let disallow: string[] = [];

  args.forEach((arg, index) => {
    if (arg === '--url') {
      url = args[index + 1];
    }

    if (arg === '--include') {
      allow = args[index + 1]?.split(',') ?? [];
    }

    if (arg === '--exclude') {
      disallow = args[index + 1]?.split(',') ?? [];
    }
  });

  if (!url) {
    console.error('Please provide a URL to index.');
    process.exit(1);
  }

  const parsed = env.parsed ?? {};

  if (!parsed.NEXT_PUBLIC_SUPABASE_URL || !parsed.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Please provide a Supabase URL and Service Role Key.');
    process.exit(1);
  }

  const client = createClient(
    parsed.NEXT_PUBLIC_SUPABASE_URL,
    parsed.SUPABASE_SERVICE_ROLE_KEY,
  );

  await runChatbotIndexer(client, {
    url,
    allow,
    disallow,
  })
    .then(() => {
      console.log('Indexing completed.');
    })
    .catch((error) => {
      console.error('Error indexing:', error);
    });
}

void main();
