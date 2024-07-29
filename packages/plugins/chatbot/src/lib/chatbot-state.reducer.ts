import { useReducer } from 'react';

import { ChatbotSettings } from './types';

export enum ChatBotActionTypes {
  SET_IS_OPEN = 'SET_IS_OPEN',
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_IS_DISABLED = 'SET_IS_DISABLED',
  SET_SETTINGS = 'SET_SETTINGS',
}

type SetIsOpenAction = {
  type: ChatBotActionTypes.SET_IS_OPEN;
  payload: boolean;
};

type SetIsLoadingAction = {
  type: ChatBotActionTypes.SET_IS_LOADING;
  payload: boolean;
};

type SetIsDisabledAction = {
  type: ChatBotActionTypes.SET_IS_DISABLED;
  payload: boolean;
};

type SetSettingsAction = {
  type: ChatBotActionTypes.SET_SETTINGS;
  payload: Partial<ChatbotSettings>;
};

type Actions =
  | SetIsOpenAction
  | SetIsLoadingAction
  | SetIsDisabledAction
  | SetSettingsAction;

const settings: ChatbotSettings = {
  title: 'Chat with us',
  position: 'bottom-right',
  branding: {
    primaryColor: '#0a0a0a',
    accentColor: '#0a0a0a',
    textColor: '#fff',
  },
};

const initialState = {
  isOpen: false,
  isLoading: false,
  isDisabled: false,
  settings,
};

type State = typeof initialState;

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case ChatBotActionTypes.SET_IS_OPEN:
      return {
        ...state,
        isOpen: action.payload,
      };

    case ChatBotActionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case ChatBotActionTypes.SET_IS_DISABLED:
      return {
        ...state,
        isDisabled: action.payload,
      };

    case ChatBotActionTypes.SET_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };

    default:
      return state;
  }
}

export function useChatBotState(state = initialState) {
  return useReducer(reducer, state);
}
