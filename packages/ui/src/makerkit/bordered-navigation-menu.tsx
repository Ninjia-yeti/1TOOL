'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '../shadcn/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '../shadcn/navigation-menu';
import { cn, isRouteActive } from '../utils';
import { Trans } from './trans';

export function BorderedNavigationMenu(props: React.PropsWithChildren) {
  return (
    <NavigationMenu>
      <NavigationMenuList className={'relative h-full space-x-2'}>
        {props.children}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function BorderedNavigationMenuItem(props: {
  path: string;
  label: React.ReactNode | string;
  end?: boolean | ((path: string) => boolean);
  active?: boolean;
  className?: string;
  buttonClassName?: string;
}) {
  const pathname = usePathname();

  const active = props.active ?? isRouteActive(props.path, pathname, props.end);

  return (
    <NavigationMenuItem className={props.className}>
      <Button
        asChild
        variant={'ghost'}
        className={cn('relative active:shadow-sm', props.buttonClassName)}
      >
        <Link
          href={props.path}
          className={cn('text-sm', {
            'text-secondary-foreground': active,
            'text-secondary-foreground/80 hover:text-secondary-foreground':
              !active,
          })}
        >
          {typeof props.label === 'string' ? (
            <Trans i18nKey={props.label} defaults={props.label} />
          ) : (
            props.label
          )}

          {active ? (
            <span
              className={cn(
                'absolute -bottom-2.5 left-0 h-0.5 w-full bg-primary animate-in fade-in zoom-in-90',
              )}
            />
          ) : null}
        </Link>
      </Button>
    </NavigationMenuItem>
  );
}
