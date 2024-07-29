import { getDatabaseWebhookHandlerService } from '@kit/database-webhooks';
import { enhanceRouteHandler } from '@kit/next/routes';

/**
 * @name POST
 * @description POST handler for the webhook route that handles the webhook event
 */
export const POST = enhanceRouteHandler(
  async ({ request }) => {
    const service = getDatabaseWebhookHandlerService();

    try {
      // handle the webhook event
      await service.handleWebhook(request);

      // return a successful response
      return new Response(null, { status: 200 });
    } catch (error) {
      // return an error response
      return new Response(null, { status: 500 });
    }
  },
  {
    auth: false,
  },
);
