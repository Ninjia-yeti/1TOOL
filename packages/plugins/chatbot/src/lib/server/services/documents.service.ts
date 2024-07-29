import { SupabaseClient } from '@supabase/supabase-js';

import { Database } from '@kit/supabase/database';

export function createDocumentsService(client: SupabaseClient<Database>) {
  return new DocumentsService(client);
}

class DocumentsService {
  constructor(private readonly client: SupabaseClient<Database>) {}

  async getDocumentByHash(params: { hash: string }) {
    return this.client
      .from('documents')
      .select('*')
      .eq('hash', params.hash)
      .single();
  }

  insertDocument(params: { title: string; content: string; hash: string }) {
    return this.client
      .from('documents')
      .insert({
        title: params.title,
        content: params.content,
        hash: params.hash,
      })
      .select('id')
      .single();
  }
}
