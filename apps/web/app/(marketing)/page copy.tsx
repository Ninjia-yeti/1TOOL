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
import { Dialog, DialogContent, DialogTrigger } from '@kit/ui/dialog';

function Home() {
  return (
    <div className={'mt-4 flex flex-col space-y-24 py-14'}>
      <section className="py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          Você está prestes a ser apresentado à Revolução no <span className="text-orange-500">Processamento</span> de Vistos Americanos
          que vai redefinir o mercado de assessoria de imigração americana.
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Transforme Seu Escritório de Assessoria de Imigração Americana e Aumente Seus Lucros com a Imigr-e Vistos,
          nossa Solução Avançada de Preenchimento e Envio Automático de Formulários (DS-160) para o Consulado Americano.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg">
                CLIQUE E ASSISTA O VÍDEO
              </button>
            </DialogTrigger>
            <DialogContent>
              <video controls>
                <source src="video-url.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </DialogContent>
          </Dialog>
          <button className="px-8 py-4 bg-orange-500 text-white font-bold rounded-lg">
            Pegue seu acesso ao Imigr-e Vistos
          </button>
        </div>
      </section>
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
