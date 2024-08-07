'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import type { User } from '@supabase/supabase-js';

import { ArrowRightIcon } from 'lucide-react';

import { PersonalAccountDropdown } from '@kit/accounts/personal-account-dropdown';
import { useSignOut } from '@kit/supabase/hooks/use-sign-out';
import { useUser } from '@kit/supabase/hooks/use-user';
import { Button } from '@kit/ui/button';
import { If } from '@kit/ui/if';
import { Trans } from '@kit/ui/trans';

import featuresFlagConfig from '~/config/feature-flags.config';
import pathsConfig from '~/config/paths.config';
import Image from 'next/image';

const ModeToggle = dynamic(
  () => import('@kit/ui/mode-toggle').then((mod) => mod.ModeToggle),
  {
    ssr: false,
  },
);

const paths = {
  home: pathsConfig.app.home,
};

const features = {
  enableThemeToggle: featuresFlagConfig.enableThemeToggle,
};

export function SiteHeaderAccountSection({
  user,
}: React.PropsWithChildren<{
  user: User | null;
}>) {
  if (!user) {
    return <AuthButtons />;
  }

  return <SuspendedPersonalAccountDropdown user={user} />;
}

function SuspendedPersonalAccountDropdown(props: { user: User | null }) {
  const signOut = useSignOut();
  const user = useUser(props.user);
  const userData = user.data ?? props.user ?? null;

  if (userData) {
    return (
      <PersonalAccountDropdown
        paths={paths}
        features={features}
        user={userData}
        signOutRequested={() => signOut.mutateAsync()}
      />
    );
  }

  return <AuthButtons />;
}

function AuthButtons() {
  return (
    <div className={'flex gap-[50px]'}>
      <div className={'hidden space-x-0.5 lg:flex items-center '}>
        {/* <If condition={features.enableThemeToggle}>
          <ModeToggle />
        </If> */}
        <div
          className='
            flex
            items-center
            gap-4
          '
        >
          <Image src='/images/Flag.svg' alt='flag' width={27} height={27} />
          <span className='hidden  lg:block'>English(US)</span>
        </div>
      </div>
      <div
        className='
          flex
          gap-[20px]
          items-center
        '
      >
        <Button asChild variant={'outline'} className="group bg-transparent p-4 py-6 flex gap-4">
          <Link href={pathsConfig.auth.signIn}>
            {/* <Trans i18nKey={'auth:signIn'} /> */}
            <Image src='/images/icons/User.svg' alt='flag' width={28} height={23} />
            Entrar
          </Link>
        </Button>
        <Button asChild className="group p-4 py-6 flex gap-4" variant={'default'}>
          <Link href={pathsConfig.auth.signUp}>
            {/* <Trans i18nKey={'auth:signUp'} /> */}
            <Image src='/images/icons/Group.svg' alt='flag' width={28} height={23} />
            Cadastre-se
          </Link>
        </Button>
      </div>

    </div>
  );
}
