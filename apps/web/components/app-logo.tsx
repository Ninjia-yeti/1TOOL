import Link from 'next/link';
import { cn } from '@kit/ui/utils';
import Image from 'next/image';

function LogoImage({
  className,
  width = 105,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <div className={cn('flex items-center', className)}>
      <Image
        src="/images/icon-logo-light.png"
        alt="Imigre Logo"
        width={width}
        height={32}
        className="w-[32px] lg:w-[32px] mr-2"
      />
      <span>Zap Tech</span>
    </div>
  );
}

export function AppLogo({
  href,
  label,
  className,
}: {
  href?: string;
  className?: string;
  label?: string;
}) {
  return (
    <Link aria-label={label ?? 'Home Page'} href={href ?? '/'}>
      <LogoImage className={className} />
    </Link>
  );
}
