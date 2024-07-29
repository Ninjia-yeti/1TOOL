import Image from 'next/image';

import { cn } from '@kit/ui/utils';

type Props = {
  title: string;
  src: string;
  preloadImage?: boolean;
  className?: string;
};

export function CoverImage({ title, src, preloadImage, className }: Props) {
  return (
    <Image
      className={cn(
        'duration-250 block rounded-xl object-cover' +
          ' transition-all hover:opacity-90',
        {
          className,
        },
      )}
      src={src}
      priority={preloadImage}
      alt={`Cover Image for ${title}`}
      fill
    />
  );
}
