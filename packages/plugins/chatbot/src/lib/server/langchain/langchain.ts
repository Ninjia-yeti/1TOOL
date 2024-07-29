import { SupabaseClient } from '@supabase/supabase-js';

import { SupabaseHybridSearch } from '@langchain/community/retrievers/supabase';
import { BaseCallbackHandler } from '@langchain/core/callbacks/base';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { LLMResult } from '@langchain/core/outputs';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { ConsoleCallbackHandler } from '@langchain/core/tracers/console';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { ContextualCompressionRetriever } from 'langchain/retrievers/contextual_compression';
import { EmbeddingsFilter } from 'langchain/retrievers/document_compressors/embeddings_filter';

import { getLogger } from '@kit/shared/logger';
import { Database } from '@kit/supabase/database';

import { getEmbeddings } from './get-embeddings-model';

// environment variables
const LLM_MODEL_NAME = process.env.LLM_MODEL_NAME ?? 'gpt-3.5-turbo';
const LLM_BASE_URL = process.env.LLM_BASE_URL;
const LLM_API_KEY = process.env.LLM_API_KEY;

/**
 * Generates a reply from a conversation chain.
 *
 * @param {Object} params - The parameters for generating the reply.
 * @param {Array<Object>} params.messages - An array of messages in the conversation.
 * Each message contains a role ('assistant' or 'user') and content (string).
 *
 **/
export async function generateReplyFromChain(params: {
  client: SupabaseClient<Database>;

  conversationReferenceId: string | undefined;
  siteName: string;

  tags?: string[];

  messages: Array<{
    role: 'assistant' | 'user';
    content: string;
  }>;
}) {
  const messages = [...params.messages];

  const latestMessage = messages.splice(-1)[0] as {
    content: string;
  };

  const callbacks: Array<BaseCallbackHandler> = [
    new StreamEndCallbackHandler(
      params.client,
      params.conversationReferenceId,
      latestMessage.content,
    ),
  ];

  if (process.env.NODE_ENV === 'development') {
    callbacks.push(new ConsoleCallbackHandler());
  }

  const model = createModel({
    streaming: true,
    temperature: 0,
    callbacks,
  });

  const questionPrompt = getPromptTemplate(params.siteName);

  const chain = crateChain({
    client: params.client,
    model,
    questionPrompt,
    tags: params.tags,
  });

  const pairs = messages.reduce<string[][]>((acc, _, index, array) => {
    if (index % 2 === 0) {
      acc.push(array.slice(index, index + 2).map((el) => el.content));
    }

    return acc;
  }, []);

  const chatHistory = pairs.reduce((acc, curr) => {
    return formatChatHistory(curr[1]!, curr[0]!, acc);
  }, '');

  return chain.stream({
    chatHistory,
    question: latestMessage.content,
  });
}

function getPromptTemplate(siteName: string) {
  return PromptTemplate.fromTemplate(
    `You are a helpful and polite customer support assistant working for ${siteName}. You will reply on behalf of ${siteName} and customers will refer to you as ${siteName}.
    Use only CHAT HISTORY and the CONTEXT to answer in a helpful manner to the question. Do not make up answers, emails, links, not in CONTEXT. If you don't know the answer - reply "Sorry, I don't know how to help with that.".
Keep your replies short, compassionate and informative. Output in markdown.
  ----------------
  CONTEXT: {context}
  ----------------
  CHAT HISTORY: {chatHistory}
  ----------------
  QUESTION: {question}
  ----------------
  Response:`,
  );
}

function getVectorStoreRetriever(client: SupabaseClient<Database>) {
  const openAi = new OpenAIEmbeddings({
    model: process.env.OPENAI_EMBEDDINGS_MODEL ?? 'text-embedding-3-small',
  });

  const baseCompressor = new EmbeddingsFilter({
    embeddings: getEmbeddings(),
  });

  const baseRetriever = new SupabaseHybridSearch(openAi, {
    client,
    similarityK: 2,
    keywordK: 2,
    tableName: 'documents_embeddings',
    similarityQueryName: 'match_documents',
    keywordQueryName: 'kw_match_documents',
  });

  return new ContextualCompressionRetriever({
    baseCompressor,
    baseRetriever,
  });
}

function crateChain(params: {
  client: SupabaseClient<Database>;
  model: ChatOpenAI;
  questionPrompt: PromptTemplate;
  tags?: string[];
}) {
  const { model, questionPrompt, client } = params;
  const retriever = getVectorStoreRetriever(client);

  const serializeDocs = (
    docs: Array<{
      pageContent: string;
    }>,
  ) => docs.map((doc) => doc.pageContent).join('\n\n');

  return RunnableSequence.from([
    {
      question: (input: { question: string }) => input.question,
      chatHistory: (input: { chatHistory?: string }) => input.chatHistory ?? '',
      context: async (input: { question: string; chatHistory?: string }) => {
        const relevantDocs = await retriever.invoke(input.question);

        return serializeDocs(relevantDocs);
      },
    },
    questionPrompt,
    model,
    new StringOutputParser(),
  ]);
}

class StreamEndCallbackHandler extends BaseCallbackHandler {
  name = 'handle-stream-end';

  constructor(
    private readonly client: SupabaseClient<Database>,
    private readonly conversationReferenceId: string | undefined,
    private readonly previousMessage: string,
  ) {
    super();
  }

  async handleLLMEnd(output: LLMResult) {
    const logger = await getLogger();

    logger.info(
      {
        conversationReferenceId: this.conversationReferenceId,
      },
      `[handleLLMEnd] Inserting messages...`,
    );

    const generations = output.generations;

    const text = generations.reduce((acc, generationsList) => {
      return (
        acc +
        generationsList.reduce((innerAcc, generation) => {
          return innerAcc + `\n` + generation.text;
        }, '')
      );
    }, '');

    if (!this.conversationReferenceId) {
      logger.warn(
        {
          conversationReferenceId: this.conversationReferenceId,
        },
        `Conversation reference id not found. Can't insert messages.`,
      );

      return;
    }

    await insertConversationMessages({
      client: this.client,
      conversationReferenceId: this.conversationReferenceId,
      previousMessage: this.previousMessage,
      text,
    });

    logger.info(
      {
        conversationReferenceId: this.conversationReferenceId,
      },
      `Successfully inserted messages.`,
    );
  }
}

export async function insertConversationMessages(params: {
  client: SupabaseClient<Database>;
  conversationReferenceId: string;
  previousMessage: string;
  text: string;
}) {
  const table = params.client.from('messages');
  const logger = await getLogger();

  const conversationId = await getConversationIdFromReferenceId(
    params.client,
    params.conversationReferenceId,
  );

  if (!conversationId) {
    logger.warn(
      {
        conversationReferenceId: params.conversationReferenceId,
      },
      `Conversation not found. Can't insert messages.`,
    );

    throw new Error(`Conversation not found. Can't insert messages.`);
  }

  const { error } = await table.insert([
    {
      conversation_id: conversationId,
      text: params.previousMessage,
      sender: 'user' as const,
      type: 'user' as const,
    },
    {
      conversation_id: conversationId,
      text: params.text,
      sender: 'assistant' as const,
      type: 'ai' as const,
    },
  ]);

  if (error) {
    logger.error(
      {
        conversationReferenceId: params.conversationReferenceId,
        error,
      },
      `Error inserting messages.`,
    );
  }
}

async function getConversationIdFromReferenceId(
  client: SupabaseClient<Database>,
  conversationReferenceId: string,
) {
  const { data } = await client
    .from('conversations')
    .select('id')
    .eq('reference_id', conversationReferenceId)
    .single();

  return data?.id;
}

function formatChatHistory(
  human: string,
  ai: string,
  previousChatHistory?: string,
) {
  if (!human) {
    return `AI: ${ai}`;
  }

  const newInteraction = `Human: ${human}\nAI: ${ai}`;

  if (!previousChatHistory) {
    return newInteraction;
  }

  return `${previousChatHistory}\n\n${newInteraction}`;
}

function createModel(props: {
  callbacks?: BaseCallbackHandler[];
  streaming?: boolean;
  temperature?: number;
}) {
  return new ChatOpenAI({
    modelName: LLM_MODEL_NAME,
    temperature: props.temperature ?? 0,
    streaming: props.streaming ?? true,
    maxTokens: 200,
    openAIApiKey: LLM_API_KEY,
    configuration: {
      baseURL: LLM_BASE_URL,
    },
    callbacks: props.callbacks ?? [],
  });
}
