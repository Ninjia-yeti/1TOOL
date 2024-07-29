import { OpenAIEmbeddings } from '@langchain/openai';

export function getEmbeddings() {
  return new OpenAIEmbeddings({
    model: process.env.OPENAI_EMBEDDINGS_MODEL ?? 'text-embedding-3-small',
  });
}
