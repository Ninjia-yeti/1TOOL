import { forwardRef } from 'react';

import { cn } from '../../utils';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ReactNode;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  function MarketingHeaderComponent(
    { className, logo, navigation, actions, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'sticky top-0 w-full h-full grow  py-2 backdrop-blur-md z-20',
          className,
        )}
        {...props}
      >
        <div className="mx-4 md:mx-32 :mx-32">
          <div className="grid  grid-cols-3 items-center justify-between">
            <div>{logo}</div>
            <div className="order-first md:order-none">{navigation}</div>
            <div className="hidden lg:flex  items-center justify-end space-x-1">
              {actions}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
