import Link from 'next/link';
import { cn } from '@kit/ui/utils';
import Image from 'next/image';

function LogoImage({
  className,
  width = 200,
  mode
}: {
  className?: string;
  width?: number;
  mode?: string
}) {
  return (
    <div className={cn('flex items-center', className)}>
      <Image
        src={`/images/${mode === 'footer' ? 'Logo-footer' : 'Logo'}.png`}
        alt="Imigre Logo"
        width={width}
        height={80}
        className="w-[100px] lg:w-[100px] mr-2"
      />
    </div>
  );
}

export function AppLogo({
  href,
  label,
  className,
  mode
}: {
  href?: string;
  className?: string;
  label?: string;
  mode?: string;
}) {
  return (
    <Link aria-label={label ?? 'Home Page'} href={href ?? '/'}>
      <LogoImage className={className} mode={mode} />
    </Link>
  );
}
