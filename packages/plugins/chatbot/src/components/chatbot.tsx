'use client';

import { ChatbotSettings } from '../lib/types';
import { ChatbotContainer } from './chatbot-container';
import { ChatBotContextProvider } from './chatbot-context';

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

export function Chatbot(props: ChatBotProps) {
  const {
    defaultPrompts = [],
    isOpen = false,
    isDisabled = false,
    settings,
    conversationId,
    storageKey,
    siteName,
    onClear,
    onMessage,
  } = props;

  return (
    <ChatBotContextProvider state={{ isOpen, isDisabled, settings }}>
      <ChatbotContainer
        conversationId={conversationId}
        defaultPrompts={defaultPrompts}
        storageKey={storageKey}
        siteName={siteName}
        onClear={onClear}
        onMessage={onMessage}
      />
    </ChatBotContextProvider>
  );
}
