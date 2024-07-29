import { SupabaseClient } from '@supabase/supabase-js';

import { StreamingTextResponse } from 'ai';
import { isbot } from 'isbot';
import { z } from 'zod';

import { getLogger } from '@kit/shared/logger';
import { Database } from '@kit/supabase/database';
import { getSupabaseRouteHandlerClient } from '@kit/supabase/route-handler-client';

import {
  generateReplyFromChain,
  insertConversationMessages,
} from './langchain/langchain';
import { getVectorStore } from './langchain/vector-store';

const CONVERSATION_ID_STORAGE_KEY = getConversationIdHeaderName();

/**
 * Handles a chat bot request. This function should be exported from a
 * Next.js App Router route handler as a POST request.
 *
 * @example
 * file: app/api/chat/route.ts
 *
 * export const POST = handleChatBotRequest;
 *
 * */
export async function handleChatBotRequest(req: Request) {
  const logger = await getLogger();
  const userAgent = req.headers.get('user-agent');

  if (isbot(userAgent)) {
    return new Response(`No chatbot for you!`, {
      status: 403,
    });
  }

  // we parse the request body to get the messages sent by the user
  const zodSchema = z.object({
    messages: z.array(
      z.object({
        content: z.string(),
        role: z.enum(['user', 'assistant'] as const),
      }),
    ),
    tags: z.array(z.string()).optional(),
  });

  const { messages, tags } = zodSchema.parse(await req.json());

  const conversationReferenceId =
    req.headers.get(CONVERSATION_ID_STORAGE_KEY) ?? undefined;

  /**
   * If the conversation reference id is missing, we don't save the conversation.
   * This should never happen in production (unless the cookie gets cleared during a session)
   * but it's possible in development when using the playground.
   */
  if (!conversationReferenceId) {
    logger.warn(
      `Missing conversation reference id. This conversation will not be saved.`,
    );
  }

  logger.info(
    {
      conversationReferenceId,
    },
    `Received chatbot message. Responding...`,
  );

  const adminClient = getSupabaseRouteHandlerClient<Database>({
    admin: true,
  });

  // if it's the first message we insert a new conversation
  if (conversationReferenceId) {
    if (messages.length <= 2) {
      logger.info(
        {
          conversationReferenceId,
        },
        `Detected new conversation. Inserting conversation...`,
      );

      const { data, error } = await insertConversation(adminClient, {
        conversationReferenceId,
      });

      if (error) {
        logger.error(
          {
            conversationReferenceId,
          },
          `Error inserting conversation.`,
        );
      } else {
        logger.info(
          {
            conversationReferenceId,
            conversationId: data.id,
          },
          `Successfully inserted conversation.`,
        );
      }
    }
  }

  // this is the user's latest message - eg. the message we want to respond to
  const latestMessage = messages[messages.length - 1] as {
    content: string;
  };

  const returnFallbackReply = () => {
    logger.info(
      {
        conversationReferenceId,
      },
      `Cannot generate AI Response. Falling back to search...`,
    );

    return fallbackSearchDocuments({
      client: adminClient,
      query: latestMessage.content,
      conversationReferenceId,
      tags,
    });
  };

  try {
    const stream = await generateReplyFromChain({
      client: adminClient,
      messages,
      conversationReferenceId,
      siteName: process.env.NEXT_PUBLIC_PRODUCT_NAME as string,
    });

    // if the AI can generate a response, we return a streaming response
    logger.info(
      {
        conversationReferenceId,
      },
      `Stream generated. Sending response...`,
    );

    return new StreamingTextResponse(stream);
  } catch (error) {
    // if there's an error generating the response
    // we fallback to a normal search

    logger.warn(
      {
        conversationReferenceId,
        error,
      },
      `Error generating response.`,
    );

    return returnFallbackReply();
  }
}

/**
 * Fallback search documents when the AI can't generate a response or
 * when the user has exhausted the number of messages in their plan
 */
async function fallbackSearchDocuments(params: {
  client: SupabaseClient<Database>;
  query: string;
  tags?: string[];
  conversationReferenceId?: string;
}) {
  const { client, query, tags, conversationReferenceId } = params;

  // in this case, use a normal search function
  const { text, stream } = await searchDocuments({
    client,
    query,
    filter: {
      tags,
    },
  });

  if (conversationReferenceId) {
    await insertConversationMessages({
      client,
      conversationReferenceId,
      text,
      previousMessage: query,
    });
  }

  return new StreamingTextResponse(stream);
}

async function searchDocuments(params: {
  client: SupabaseClient<Database>;
  query: string;
  filter: {
    tags?: string[];
  };
}) {
  const { client, query } = params;
  const documentSize = 5;
  const tags = params.filter.tags ?? [];

  const store = await getVectorStore(client);

  const documents = await store
    .asRetriever(
      documentSize,
      tags.length
        ? (filter) => {
            return filter.in('metadata -> tag::text', tags);
          }
        : undefined,
    )
    .invoke(query);

  const content = documents
    .map((document) => {
      return `<a target='_blank' class='document-link hover:underline py-1' href="${document.metadata.url}">${document.metadata.title}</a>`;
    })
    .join('\n\n');

  const contentResponse = `I found these documents that might help you:\n\n${content}`;

  const text = documents.length
    ? contentResponse
    : 'Sorry, I was not able to find an answer for you.';

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(text);
      controller.close();
    },
  });

  return {
    stream,
    text,
  };
}

function insertConversation(
  client: SupabaseClient<Database>,
  params: {
    conversationReferenceId: string;
  },
) {
  return client
    .from('conversations')
    .insert({
      reference_id: params.conversationReferenceId,
    })
    .select('id')
    .single();
}

function getConversationIdHeaderName() {
  return process.env.CONVERSATION_ID_STORAGE_KEY ?? `x-conversation-id`;
}
