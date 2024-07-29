import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import { Trans } from '@kit/ui/trans';

export function DocsCard({
  title,
  subtitle,
  children,
  link,
}: React.PropsWithChildren<{
  title: string;
  subtitle?: string | null;
  link: { url: string; label?: string };
}>) {
  return (
    <div className="flex flex-col">
      <div
        className={`flex grow flex-col space-y-2.5 border bg-background p-6 ${link ? 'rounded-t-2xl border-b-0' : 'rounded-2xl'}`}
      >
        <h3 className="mt-0 text-lg font-semibold hover:underline dark:text-white">
          <Link href={link.url}>{title}</Link>
        </h3>

        {subtitle && (
          <div className="text-sm text-muted-foreground">
            <p dangerouslySetInnerHTML={{ __html: subtitle }}></p>
          </div>
        )}

        {children && <div className="text-sm">{children}</div>}
      </div>

      {link && (
        <div className="rounded-b-2xl border bg-muted p-6 py-4 dark:bg-background">
          <span className={'flex items-center space-x-2'}>
            <Link
              className={'text-sm font-medium hover:underline'}
              href={link.url}
            >
              {link.label ?? <Trans i18nKey={'marketing:readMore'} />}
            </Link>

            <ChevronRight className={'h-4'} />
          </span>
        </div>
      )}
    </div>
  );
}
