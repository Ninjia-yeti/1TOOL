import Link from 'next/link';

import { ArrowRightIcon } from 'lucide-react';

import { PricingTable } from '@kit/billing-gateway/marketing';

import {
  About,
  CtaButton,
  Features,
  Hero,
  HowItWorks,
  Pill,
  SecondaryHero,
  Sponsors,
  Team,
} from '@kit/ui/marketing';

import { Trans } from '@kit/ui/trans';

import billingConfig from '~/config/billing.config';
import pathsConfig from '~/config/paths.config';
import { withI18n } from '~/lib/i18n/with-i18n';

function Home() {
  return (
    <div className={'mt-4 flex flex-col space-y-24 py-14'}>
      <Hero
        pill={
          <Pill label={'New'}>
            <span>The Startup Swiss Knife for <u>ambitious entrepreneurs</u></span>
          </Pill>
        }
        title={
          <>
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">Launch your <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">Startup in</span></span>

            <span><u>record time</u> 🚀</span>
          </>
        }
        subtitle={
          <span>
            We built this boilerplate after many years of experience focusing on not wasting time and money on everyday situations. Everything you need to <b>launch, scale, and succeed.</b>
          </span>
        }
        cta={<MainCallToActionButton />}
      />

      <Sponsors />
      <Features />
      <About />
      <HowItWorks />
      <Team />

      <div className={'container mx-auto'}>
        <div
          className={
            'flex flex-col items-center justify-center space-y-16 py-16'
          }
        >
          <SecondaryHero
            pill={<Pill>
              Payments are an important part of your business. We make it easy.
            </Pill>}
            heading="Show your plans and pricing easily"
            subheading="You can charge your customers with subscriptions, one-time payments, and more."
          />

          <div className={'w-full'}>
            <PricingTable
              config={billingConfig}
              paths={{
                signUp: pathsConfig.auth.signUp,
                return: pathsConfig.app.home,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withI18n(Home);

function MainCallToActionButton() {
  return (
    <div className={'flex space-x-4'}>
      <CtaButton>
        <Link href={'/auth/sign-up'}>
          <span className={'flex items-center space-x-0.5'}>
            <span>
              <Trans i18nKey={'common:getStarted'} />
            </span>

            <ArrowRightIcon
              className={
                'h-4 animate-in fade-in slide-in-from-left-8' +
                ' delay-1000 duration-1000 zoom-in fill-mode-both'
              }
            />
          </span>
        </Link>
      </CtaButton>

      <CtaButton variant={'link'}>
        <Link href={'/contact'}>
          <Trans i18nKey={'common:contactUs'} />
        </Link>
      </CtaButton>
    </div>
  );
}
