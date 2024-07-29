## Chatbot Plugin

This plugin allows you to create a chatbot for your app. Users can interact with the chatbot to get information about
your app.

The chatbot will index your app's content and provide answers to user queries.

## Installation

Install the chatbot plugin from your main app:

```bash
npx @makerkit/cli text-editor install chatbot
```

Now, install the plugin package in your application:

```bash
pnpm add --filter web @kit/chatbot
```

```bash

## Import the Chatbot component

You can now import the Chatbot component in your app:

```tsx
import { Chatbot } from '@kit/chatbot';

<Chatbot sitename={'Makerkit'} />
```

## Create the API route handler

You can add this anywhere since it's configurable, but my suggestion is to add it to the `api/chat` directory. Create a new file called `route.ts` at `apps/web/app/api/chat/route.ts`:

```ts
import { handleChatBotRequest } from '@kit/chatbot/server';

export const POST = handleChatBotRequest;
```

If you use a different path, please set the `NEXT_PUBLIC_CHATBOT_API_URL` environment variable:

```bash
NEXT_PUBLIC_CHATBOT_API_URL=/api/some-other-path
```

## Add the Migration file

Copy the migration file at `packages/plugins/chatbot/migrations` into your apps migration directory at `apps/web/supabase/migrations`.

Make sure to reset the database after copying the migration file and make sure to push this to your remote instance.

## Add your OpenAI API Key

In your hosting provider, add the `OPENAI_API_KEY` environment variable with your OpenAI API key.

```bash
OPENAI_API_KEY=sk-1234567890
```

Locally, you can set it in your `.env.local` file, which is never committed to the repository.

## Configuration

The Chatbot component accepts the following props:

```tsx
interface ChatBotProps {
    siteName: string;

    conversationId?: string;
    defaultPrompts?: string[];
    isOpen?: boolean;
    isDisabled?: boolean;
    settings?: ChatbotSettings;
    storageKey?: string;

    onClear?: () => void;
    onMessage?: (message: string) => void;
}
```

## Customizing the Chatbot

You can customize the chatbot by providing a `settings` object:

```tsx
type Position = `bottom-left` | `bottom-right`;

interface Branding {
    primaryColor: string;
    accentColor: string;
    textColor: string;
}

export interface ChatbotSettings {
    title: string;
    position: Position;
    branding: Branding;
}
```

For example:

```tsx
<Chatbot
    settings={{
        title: 'Chat with us',
        position: 'bottom-right',
        branding: {
            primaryColor: '#000',
            accentColor: '#000',
            textColor: '#fff',
        },
    }}
/>
```

## Indexing Content

At this time - the Chatbot will crawl your app's content and index it - by reading the sitemap.xml file.

The crawler will infer the sitemap.xml from the website's robots.txt file. Otherwise, you can provide the sitemap.xml
URL using the `CHATBOT_WEBSITE_SITEMAP_URL` environment variable.

```bash
CHATBOT_WEBSITE_SITEMAP_URL=https://example.com/sitemap.xml
```

Then, you will need to provide your Supabase remote instance URL and key using the `.env.local` file in the root of your project.

```bash
SUPABASE_SERVICE_ROLE_KEY=*****
NEXT_PUBLIC_SUPABASE_URL=https://*****.supabase.co
OPENAI_API_KEY=sk-*****
```

Please make sure to never commit these keys to your repository. By default, the

To index your website's content, the chatbot will read the sitemap.xml file. 

To launch the chatbot crawler, run the command:

```bash
pnpm --filter chatbot indexer -- --url <url> --include <include-paths> --exclude <excluded-paths>
```

For example:

```bash
pnpm --filter chatbot indexer -- --url https://example.com --include /docs,/blog --exclude /blog/secret
```

The `--url` flag is required and should point to the website's root URL. The `--include` and `--exclude` flags are optional and should be comma-separated paths.

It's highly recommended to include the `--exclude` flag to prevent the chatbot from indexing way too many pages or stuff you don't want to be indexed.