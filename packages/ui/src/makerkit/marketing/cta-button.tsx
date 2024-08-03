import { forwardRef } from 'react';

import { Button } from '../../shadcn/button';
import { cn } from '../../utils';

export const CtaButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(function CtaButtonComponent({ className, children, ...props }, ref) {
  return (
    <Button
      className={cn(
        'h-66 max-w-[600px] rounded-xl px-4 text-base font-semibold transition-all hover:shadow-2xl dark:shadow-primary/30',
        className,
      )}
      asChild
      ref={ref}
      {...props}
    >
      {children}
    </Button>
  );
});
