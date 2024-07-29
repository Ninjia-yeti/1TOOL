import { useContext } from 'react';

import { BotMessageSquareIcon, X } from 'lucide-react';

import { cn } from '@kit/ui/utils';

import { ChatbotContext } from './chatbot-context';

export function ChatbotBubble() {
  const { state, onOpenChange } = useContext(ChatbotContext);

  const isOpen = state.isOpen;
  const position = state.settings.position;
  const primaryColor = state.settings.branding.primaryColor;

  const className = cn('border', {
    'bottom-8 md:bottom-16 md:right-8': position === 'bottom-right',
    'bottom-8 md:bottom-16 md:left-8': position === 'bottom-left',
    'hidden md:flex': isOpen,
  });

  const iconClassName = 'w-8 h-8 animate-in fade-in zoom-in';

  const Icon = isOpen ? (
    <X className={iconClassName} />
  ) : (
    <BotMessageSquareIcon className={iconClassName} />
  );

  return (
    <button
      style={{
        backgroundColor: primaryColor,
      }}
      className={cn(
        'animate-out h-16 w-16 rounded-full text-white' +
          ' animate-in zoom-in slide-in-from-bottom-16 fixed flex items-center justify-center' +
          ' hover:opacity/90 transition-all hover:shadow-xl' +
          ' z-50 duration-500 hover:-translate-y-1 hover:scale-105',
        className,
      )}
      onClick={() => onOpenChange(!isOpen)}
    >
      {Icon}
    </button>
  );
}
