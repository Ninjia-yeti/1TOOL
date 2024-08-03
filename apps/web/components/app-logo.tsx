import Link from 'next/link';
import { cn } from '@kit/ui/utils';
import Image from 'next/image';

function LogoImage({
  className,
  width = 224,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <div className={cn('flex items-center', className)}>
      <Image
        src="/images/logo.png"
        alt="Imigre Logo"
        width={width}
        height={167}
        className="w-[224px] lg:w-[224px] mr-2"
      />
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
