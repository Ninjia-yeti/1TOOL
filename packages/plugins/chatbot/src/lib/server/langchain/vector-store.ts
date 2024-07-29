import type { SupabaseClient } from '@supabase/supabase-js';

import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';

import { Database } from '@kit/supabase/database';

import { getEmbeddings } from './get-embeddings-model';

export function getVectorStore(client: SupabaseClient<Database>) {
  return SupabaseVectorStore.fromExistingIndex(getEmbeddings(), {
    client,
    tableName: 'documents_embeddings',
    queryName: 'match_documents',
  });
}
