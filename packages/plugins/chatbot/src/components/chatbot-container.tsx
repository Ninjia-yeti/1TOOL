'use client';

import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { useChat } from '@ai-sdk/react';
import type { ChatRequestOptions, Message } from 'ai';
import { RefreshCcw, Send, X } from 'lucide-react';

import { If } from '@kit/ui/if';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kit/ui/tooltip';
import { cn } from '@kit/ui/utils';

import { chatBotMessagesStore } from '../lib/chatbot-messages-store';
import { ChatBotMessageRole } from '../lib/message-role.enum';
import { ChatbotBubble } from './chatbot-bubble';
import { ChatbotContext } from './chatbot-context';
import { MarkdownRenderer } from './markdown-renderer';

const NEXT_PUBLIC_CHATBOT_API_URL =
  process.env.NEXT_PUBLIC_CHATBOT_API_URL ?? '/api/chat';

if (!NEXT_PUBLIC_CHATBOT_API_URL) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_CHATBOT_API_URL is not set`,
  );
}

type ChatBotProps = React.PropsWithChildren<{
  siteName: string;

  defaultPrompts?: string[];
  storageKey?: string;
  conversationId?: string;

  onClear?: () => void;
  onMessage?: (message: string) => void;
}>;

export function ChatbotContainer(props: ChatBotProps) {
  const { state, onOpenChange, onLoadingChange } = useContext(ChatbotContext);
  const scrollingDiv = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = useScrollToBottom(scrollingDiv);

  const [error, setError] = useState<string | undefined>(undefined);

  const {
    messages,
    input,
    handleSubmit,
    handleInputChange,
    append,
    setMessages,
    isLoading,
  } = useChat({
    api: NEXT_PUBLIC_CHATBOT_API_URL,
    streamMode: 'text',
    initialMessages: chatBotMessagesStore.loadMessages(
      props.storageKey,
      props.siteName,
    ),
    onError: (error) => {
      setError('Sorry, we could not process your request. Please try again.');
      onLoadingChange(false);
      console.error(error);
    },
    onResponse: () => {
      onLoadingChange(false);
    },
    onFinish: (message) => {
      if (props.onMessage) {
        props.onMessage(message.content);
      }
    },
    headers: {
      'x-conversation-id': props.conversationId ?? '',
    },
  });

  useEffect(() => {
    scrollToBottom({ smooth: true });
    setError(undefined);
    chatBotMessagesStore.saveMessages(messages, props.storageKey);
  }, [messages, scrollToBottom, props.storageKey]);

  return (
    <>
      <If condition={state.isOpen}>
        <ChatbotContentContainer position={state.settings.position}>
          <div className={'flex h-full flex-col'}>
            <ChatBotHeader
              onClose={() => onOpenChange(false)}
              onRefresh={() => {
                chatBotMessagesStore.removeMessages(props.storageKey);

                setMessages(
                  chatBotMessagesStore.loadMessages(
                    props.storageKey,
                    props.siteName,
                  ),
                );

                if (props.onClear) {
                  props.onClear();
                }
              }}
            />

            <div
              ref={(div) => {
                scrollingDiv.current = div;
              }}
              className={'flex flex-1 flex-col overflow-y-auto'}
            >
              <ChatBotMessages
                isLoading={state.isLoading}
                messages={messages}
                defaultPrompts={props.defaultPrompts}
                onPromptClick={(content) => {
                  onLoadingChange(true);

                  return append({
                    role: ChatBotMessageRole.User,
                    content,
                  });
                }}
              />
            </div>

            <If condition={error}>
              <div className={'p-4'}>
                <span className={'text-xs text-red-500'}>{error}</span>
              </div>
            </If>

            <ChatBotInput
              isLoading={isLoading || state.isLoading}
              input={input}
              disabled={state.isDisabled}
              /* @ts-expect-error: TS being weird */
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
            />
          </div>
        </ChatbotContentContainer>
      </If>

    </>
  );
}

function ChatBotHeader(
  props: React.PropsWithChildren<{
    onClose: () => void;
    onRefresh: () => void;
  }>,
) {
  const { state } = useContext(ChatbotContext);

  return (
    <div
      className={
        'flex items-center justify-between border-b px-4 py-3 md:rounded-t-xl'
      }
    >
      <div className={'text-foreground flex flex-col'}>
        <span className={'font-semibold'}>{state.settings.title}</span>
      </div>

      <div className={'flex items-center space-x-4'}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={props.onRefresh}>
                <RefreshCcw
                  className={'text-foreground h-4 dark:hover:text-white'}
                />
              </button>
            </TooltipTrigger>

            <TooltipContent>Reset conversation</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={props.onClose}>
                <X className={'text-foreground h-4 dark:hover:text-white'} />
              </button>
            </TooltipTrigger>

            <TooltipContent>Close</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

function ChatBotMessages(
  props: React.PropsWithChildren<{
    isLoading: boolean;
    defaultPrompts?: string[];
    messages: Message[];
    onPromptClick: (prompt: string) => void;
  }>,
) {
  const shouldDisplayHelpButtons = useShouldDisplayHelpButtons(props.messages);
  const shouldDisplayDefaultPrompts = props.messages.length < 2;

  return (
    <div className={'relative flex-1 flex-col space-y-2 p-4'}>
      {props.messages.map((message, index) => {
        return <ChatBotMessage key={index} message={message} />;
      })}

      <If condition={props.isLoading}>
        <BubbleAnimation />
      </If>

      <If condition={shouldDisplayHelpButtons}>
        <div className={'py-1'}>
          <HelpButtonsContainer />
        </div>
      </If>

      <If condition={shouldDisplayDefaultPrompts}>
        <div className={'py-4'}>
          <DefaultPromptsContainer
            onPromptClick={props.onPromptClick}
            defaultPrompts={props.defaultPrompts}
          />
        </div>
      </If>
    </div>
  );
}

function ChatBotMessage({ message }: { message: Message }) {
  const { state } = useContext(ChatbotContext);

  const isBot = message.role === ChatBotMessageRole.Assistant;
  const isUser = message.role === ChatBotMessageRole.User;

  const className = cn(
    `px-2.5 py-1.5 flex space-x-2 inline-flex text-sm rounded items-center border`,
    {
      'bg-secondary text-secondary-foreground': isBot,
      [`bg-background`]: isUser,
    },
  );

  const primaryColor = state.settings.branding.primaryColor;
  const textColor = state.settings.branding.textColor;

  const style = isUser
    ? {
      backgroundColor: primaryColor,
      color: textColor,
    }
    : {};

  return (
    <div
      className={cn(`flex`, {
        'justify-end': isUser,
        'justify-start': isBot,
      })}
    >
      <div className={'flex flex-col space-y-1.5 overflow-x-hidden'}>
        <span
          className={cn('px-1 py-1 text-sm font-medium', {
            'pr-2 text-right': isUser,
          })}
        >
          {isBot ? `AI` : `You`}
        </span>

        <div style={style} className={className}>
          <MarkdownRenderer className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 overflow-x-hidden break-words">
            {message.content}
          </MarkdownRenderer>
        </div>
      </div>
    </div>
  );
}

function ChatBotInput({
  isLoading,
  disabled,
  input,
  handleSubmit,
  handleInputChange,
}: React.PropsWithChildren<{
  input: string;
  isLoading: boolean;
  disabled: boolean;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions,
  ) => unknown;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
}>) {
  const { onLoadingChange } = useContext(ChatbotContext);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (isLoading || disabled) {
        return;
      }

      onLoadingChange(true);

      handleSubmit(e);
    },
    [handleSubmit, disabled, isLoading, onLoadingChange],
  );

  return (
    <form onSubmit={onSubmit}>
      <div className={'relative flex'}>
        <input
          disabled={isLoading || disabled}
          autoComplete={'off'}
          required
          value={input}
          onChange={handleInputChange}
          name={'message'}
          className={
            'text-muted-foreground h-14 p-4' +
            ' w-full rounded-bl-xl rounded-br-xl outline-none' +
            ' resize-none border-t text-sm transition-colors' +
            ' bg-background focus:text-secondary-foreground pr-8'
          }
          placeholder="Ask our chatbot a question..."
        />

        <button
          disabled={isLoading || disabled}
          type={'submit'}
          className={'absolute right-4 top-4 bg-transparent'}
        >
          <Send className={'text-muted-foreground h-6'} />
        </button>
      </div>
    </form>
  );
}

function HelpButtonsContainer() {
  const supportFallbackUrl = process.env.NEXT_PUBLIC_CHATBOT_FALLBACK_URL;

  if (!supportFallbackUrl) {
    return null;
  }

  return (
    <div className={'flex'}>
      <ClickablePrompt href={supportFallbackUrl}>
        Contact Support
      </ClickablePrompt>
    </div>
  );
}

function DefaultPromptsContainer({
  defaultPrompts,
  onPromptClick,
}: {
  defaultPrompts?: string[];
  onPromptClick: (prompt: string) => void;
}) {
  if (!defaultPrompts) {
    return null;
  }

  return (
    <div className={'grid grid-cols-2 gap-2'}>
      {defaultPrompts.map((text, index) => {
        return (
          <ClickablePrompt
            key={index}
            onClick={() => {
              onPromptClick(text);
            }}
          >
            {text}
          </ClickablePrompt>
        );
      })}
    </div>
  );
}

function ClickablePrompt(
  props: React.PropsWithChildren<
    | {
      onClick: () => void;
    }
    | {
      href: string;
    }
  >,
) {
  const className = `p-1.5 rounded-md text-xs inline-flex border 
      text-left transition-all hover:bg-muted`;

  if ('href' in props) {
    return (
      <a href={props.href} className={className}>
        {props.children}
      </a>
    );
  }

  return (
    <button className={className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

function BubbleAnimation() {
  const dotClassName = `rounded-full bg-muted h-2.5 w-2.5`;

  return (
    <div
      className={
        'animate-in slide-in-from-bottom-12 py-4 duration-1000 ease-out'
      }
    >
      <div className={'duration-750 flex animate-bounce space-x-1'}>
        <div className={dotClassName} />
        <div className={dotClassName} />
        <div className={dotClassName} />
      </div>
    </div>
  );
}

function useShouldDisplayHelpButtons(messages: Message[]) {
  const lastMessage = messages[messages.length - 1];

  if (!lastMessage) {
    return false;
  }

  return lastMessage.content.includes(
    `Sorry, I don't know how to help with that`,
  );
}

function useScrollToBottom<
  ScrollingDiv extends {
    current: HTMLDivElement | null;
  },
>(scrollingDiv: ScrollingDiv) {
  return useCallback(
    ({ smooth } = { smooth: false }) => {
      setTimeout(() => {
        const div = scrollingDiv.current;

        if (!div) return;

        div.scrollTo({
          behavior: smooth ? 'smooth' : 'auto',
          top: div.scrollHeight,
        });
      }, 50);
    },
    [scrollingDiv],
  );
}

function ChatbotContentContainer(
  props: React.PropsWithChildren<{
    position?: 'bottom-left' | 'bottom-right';
  }>,
) {
  const position = props.position ?? 'bottom-right';

  const className = cn({
    'bottom-0 md:bottom-36 md:right-8': position === 'bottom-right',
    'bottom-0 md:bottom-36 md:left-8': position === 'bottom-left',
  });

  return (
    <div
      className={cn(
        'animate-in fade-in slide-in-from-bottom-24 fixed z-50 duration-200' +
        ' bg-background font-sans md:rounded-lg' +
        ' h-[60vh] w-full md:w-[40vw] xl:w-[26vw]' +
        ' zoom-in-90 border shadow-2xl',
        className,
      )}
    >
      {props.children}
    </div>
  );
}
