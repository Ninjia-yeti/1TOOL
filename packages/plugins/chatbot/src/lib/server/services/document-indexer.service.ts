import { SupabaseClient } from '@supabase/supabase-js';

import { createHash } from 'crypto';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import { getLogger } from '@kit/shared/logger';

import { parallelizeBatch } from '../../utils/parallelize-batch';
import { createChatbotCrawler } from '../indexer/chatbot-crawler';
import { createHTMLDocumentParser } from '../indexer/parser';
import { getVectorStore } from '../langchain/vector-store';
import { createDocumentsService } from './documents.service';

const DOCUMENT_CHUNK_SIZE = process.env.DOCUMENT_CHUNK_SIZE
  ? Number(process.env.DOCUMENT_CHUNK_SIZE)
  : 1500;

export function createDocumentIndexerService() {
  return new DocumentIndexerService();
}

class DocumentIndexerService {
  async indexDocuments({
    client,
    body,
  }: {
    client: SupabaseClient;
    body: {
      links: string[];
      allow: string[];
      disallow: string[];
    };
  }) {
    const logger = await getLogger();
    const vectorStore = await getVectorStore(client);
    const service = createDocumentsService(client);

    const crawler = createChatbotCrawler();
    const parser = createHTMLDocumentParser();

    const links = crawler.filterLinks(body.links, {
      allow: body.allow,
      disallow: body.disallow,
    });

    logger.info(
      {
        links: links.length,
      },
      `Crawling links...`,
    );

    const requests = links.map((url) => {
      return async () => {
        async function fetchPage() {
          try {
            logger.info(
              {
                url,
              },
              `Crawling URL...`,
            );

            const host = new URL(url).origin;
            const contents = await crawler.crawl(url);

            return await parser.parse(contents, host);
          } catch (e) {
            logger.warn(
              {
                url,
                error: e,
              },
              `Error crawling URL`,
            );

            throw e;
          }
        }

        try {
          const { content, title } = await fetchPage();
          const hash = sha256(content);

          logger.info(
            {
              title,
            },
            `Successfully fetched page content`,
          );

          logger.info(
            {
              title,
            },
            `Verifying document hash...`,
          );

          // we try avoid indexing the embedding twice
          // by looking the same hash in the DB
          const existingDocument = await service.getDocumentByHash({
            hash,
          });

          if (existingDocument.data) {
            logger.info(
              {
                title,
                hash,
              },
              `Document already indexed. Skipping...`,
            );

            return {
              success: false,
            };
          }

          logger.info(
            {
              title,
            },
            `Inserting document...`,
          );

          const documentResponse = await service.insertDocument({
            title,
            content,
            hash,
          });

          if (documentResponse.error) {
            logger.error(
              {
                title,
                error: documentResponse.error,
              },
              `Error inserting document`,
            );

            throw documentResponse.error;
          }

          const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: DOCUMENT_CHUNK_SIZE,
            chunkOverlap: 0,
          });

          logger.info(
            {
              title,
              ...body,
            },
            `Splitting document...`,
          );

          const splittedDocs = await splitter.splitText(content);

          const documentEmbeddings = splittedDocs.map((item) => {
            return {
              pageContent: item,
              metadata: {
                title: title,
                hash,
                url,
                document_id: documentResponse.data.id,
              },
            };
          });

          logger.info(
            {
              title,
            },
            `Indexing documents...`,
          );

          // generate embeddings and summarize
          await vectorStore.addDocuments(documentEmbeddings);

          logger.info(
            {
              title,
            },
            `Documents successfully indexed.`,
          );

          return {
            success: true,
          };
        } catch (error) {
          logger.error({ error }, `Error indexing document`);

          return {
            success: false,
            error,
          };
        }
      };
    });

    const concurrentRequests = 2;
    const delayBetweenRequestsMs = 1000;

    logger.info(
      {
        concurrentRequests,
        delayBetweenRequestsMs,
      },
      `Starting indexing process. Running requests in parallel...`,
    );

    // run requests in parallel with a delay between each batch
    const tasks = await parallelizeBatch(
      requests,
      concurrentRequests,
      delayBetweenRequestsMs,
    );

    const success = tasks.filter((task) => task.success).length;
    const failed = tasks.filter((task) => !task.success).length;

    logger.info(
      {
        success,
        failed,
      },
      `Document indexed.`,
    );

    return {
      success,
      failed,
    };
  }
}

function sha256(content: string) {
  return createHash('sha256').update(content).digest('hex');
}
