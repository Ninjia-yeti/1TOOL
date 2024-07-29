import { Message } from 'ai';

import { ChatBotMessageRole } from './message-role.enum';

const LOCAL_STORAGE_KEY = createLocalStorageKey();

export const chatBotMessagesStore = {
  loadMessages(key = LOCAL_STORAGE_KEY, siteName: string): Message[] {
    const emptyMessages = [
      {
        id: 'initial-message',
        content: `Hi, I'm the ${siteName} chatbot! How can I help you?`,
        role: ChatBotMessageRole.Assistant,
      },
    ];

    if (typeof document === 'undefined') {
      return emptyMessages;
    }

    const messages = localStorage.getItem(key);

    try {
      if (messages) {
        const parsed = (JSON.parse(messages) ?? []) as Message[];

        if (!parsed.length) {
          return emptyMessages;
        }

        return parsed;
      }
    } catch (error) {
      return emptyMessages;
    }

    return emptyMessages;
  },
  saveMessages(messages: Message[], key = LOCAL_STORAGE_KEY) {
    localStorage.setItem(key, JSON.stringify(messages));
  },
  removeMessages(storageKey: string | undefined) {
    localStorage.removeItem(storageKey ?? LOCAL_STORAGE_KEY);
  },
};

function createLocalStorageKey() {
  if (typeof window === 'undefined') {
    return 'chatbot-messages';
  }

  const domain = window.location.hostname.split('.').join('-');

  return `${domain}-chatbot-messages`;
}
