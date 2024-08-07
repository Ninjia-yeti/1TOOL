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
          'z-30 sticky bg-[#1B2151] flex items-center  h-[73px] text-white top-0 w-full shadow-lg  grow  py-1 backdrop-blur-md',
          className,
        )}
        {...props}
      >
        <div className="px-4 py-2 md:px-40 lg:px-40 w-full">
          <div className="grid  grid-cols-3 md:flex items-center justify-between">
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
