import { forwardRef } from 'react';
import { Radar } from 'lucide-react';
import { cn } from '../../utils';

interface SponsorProps {
  icon: JSX.Element;
  name: string;
}

interface SponsorsProps extends React.HTMLAttributes<HTMLElement> {
  sponsors?: SponsorProps[];
}

const defaultSponsors: SponsorProps[] = [
  { icon: <Radar size={34} />, name: 'Sponsor 1' },
  { icon: <Radar size={34} />, name: 'Sponsor 2' },
  { icon: <Radar size={34} />, name: 'Sponsor 3' },
  { icon: <Radar size={34} />, name: 'Sponsor 4' },
  { icon: <Radar size={34} />, name: 'Sponsor 5' },
  { icon: <Radar size={34} />, name: 'Sponsor 6' },
];

export const Sponsors = forwardRef<HTMLElement, SponsorsProps>(
  function SponsorsComponent(
    { className, sponsors = defaultSponsors, ...props },
    ref,
  ) {
    return (
      <section
        ref={ref}
        id="sponsors"
        className={cn('container ', className)}
        {...props}
      >
        <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
          Sponsors, Investors, and Partners
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {sponsors.map(({ icon, name }: SponsorProps) => (
            <div
              key={name}
              className="flex items-center gap-1 text-muted-foreground/60"
            >
              <span>{icon}</span>
              <h3 className="text-xl font-bold">{name}</h3>
            </div>
          ))}
        </div>
      </section>
    );
  }
);
