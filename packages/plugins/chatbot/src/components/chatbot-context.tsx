import { createContext, useEffect } from 'react';

import {
  ChatBotActionTypes,
  useChatBotState,
} from '../lib/chatbot-state.reducer';
import { ChatbotSettings } from '../lib/types';

interface ChatBotContextState {
  state: ReturnType<typeof useChatBotState>[0];
  onOpenChange: (isOpen: boolean) => void;
  onLoadingChange: (isLoading: boolean) => void;
}

const initialState = {
  isOpen: false,
  isLoading: false,
  isDisabled: false,
  settings: {
    title: 'AI Assistant',
    position: 'bottom-right' as const,
    branding: {
      primaryColor: '#0a0a0a',
      textColor: '#ffffff',
      accentColor: '#0a0a0a',
    },
  },
};

export const ChatbotContext = createContext<ChatBotContextState>({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onOpenChange: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onLoadingChange: () => {},
} as ChatBotContextState);

export function ChatBotContextProvider(
  props: React.PropsWithChildren<{
    state: {
      isOpen: boolean;
      isDisabled: boolean;
      settings?: ChatbotSettings;
    };
  }>,
) {
  const [state, dispatch] = useChatBotState({
    isLoading: false,
    isOpen: props.state.isOpen,
    isDisabled: props.state.isDisabled,
    settings: props.state.settings ?? initialState.settings,
  });

  const onOpenChange = (isOpen: boolean) =>
    dispatch({ type: ChatBotActionTypes.SET_IS_OPEN, payload: isOpen });

  const onLoadingChange = (isLoading: boolean) =>
    dispatch({ type: ChatBotActionTypes.SET_IS_LOADING, payload: isLoading });

  useEffect(() => {
    dispatch({
      type: ChatBotActionTypes.SET_SETTINGS,
      payload: props.state.settings ?? initialState.settings,
    });
  }, [props.state.settings, dispatch]);

  return (
    <ChatbotContext.Provider value={{ state, onOpenChange, onLoadingChange }}>
      {props.children}
    </ChatbotContext.Provider>
  );
}
