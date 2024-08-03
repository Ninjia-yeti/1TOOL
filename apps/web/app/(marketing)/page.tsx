import Link from 'next/link';

import { ArrowRightIcon } from 'lucide-react';

import { PricingTable } from '@kit/billing-gateway/marketing';
import Image from 'next/image';

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
    <div className={'mt-4 flex flex-col space-y-24 py-2 md:py-14 lg:py-14 justify-center items-center text-[#1B2151] bg-[#F4F4F4]'}>
      <section className="py-12 px-4 max-w-[100vw]">
        <h1 className="text-[30px] md:text-[60px] lg:text-[60px] md:text-4xl font-bold px-4 md:px-60 lg:px-60 leading-[30px] md:leading-[65px] lg:leading-[65px] text-center mb-4 text-[#1B2151]">
          a Revolução no <span className="text-orange-500">Processamento</span>  de Vistos Americanos que vai redefinir o mercado de assessoria  de imigração americana.
        </h1>
        <p className="text-xl md:text-3xl mb-8 text-center px-4  md:px-80 lg:px-80  text-[#1B2151]">
          Transforme Seu Escritório de Assessoria de Imigração Americana e Aumente Seus Lucros com a Imigr-e Vistos,
          nossa Solução Avançada de Preenchimento e Envio Automático de Formulários (DS-160) para o Consulado Americano.
        </p>
        <p className='text-2xl md:text-4xl lg:text-4xl text-center font-bold'>
          CLIQUE E ASSISTA O VÍDEO
        </p>
      </section >
      <section className='relative w-full px-4 md:px-8 lg:px-8 flex items-center justify-center'>
        <div className='absolute w-[30vw] top-[-28vw] right-0'>
          <Image src={'/images/flag-usa.svg'} alt='flag' width={357} height={398} layout='responsive' />
        </div>
        <div className='bg-[#232A66] w-[15vw] h-[20vw] rounded-l-md'></div>
        <div className='w-[70vw]'>
          <Image src='/images/Video.svg' alt='video' width={1100} height={426} className='right-0 z-10' layout='responsive' />
        </div>
        <div className='bg-[#232A66] w-[15vw] h-[20vw] rounded-r-md'></div>
      </section>
      {/* <Hero
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
      /> */}
      <div className='w-full'>
        <div className='flex w-full px-4 justify-center'>
          <CtaButton className='py-7 bg-[#FE7638] '>
            <Link href={'/'} className=''>
              <span className={'flex items-center text-[18px] md:text-[24px] lg:text-[24px]  font-bold '}>
                <span>
                  <Trans i18nKey={'Pegue seu acesso ao Imigr-e Vistos'} />
                </span>

                {/* <ArrowRightIcon
              className={
                'h-4 animate-in fade-in slide-in-from-left-8' +
                ' delay-1000 duration-1000 zoom-in fill-mode-both'
              }
            /> */}
              </span>
            </Link>
          </CtaButton>
        </div>
        <p className='flex justify-center text-xl lg:text-2xl font-bold text-[#1B2151] py-5'>
          A Revolução Digital
        </p>
        <div className='w-full'>
          <div className='block md:hidden lg:hidden px-4'>
            <Image src={'/images/pastaEmigre.svg'} alt='flag' width={534} height={355} layout='responsive' />
          </div>
        </div>
        <div className='relative w-full'>
          <div className='hidden md:block lg:block absolute right-[50px] bottom-[-220px]'>
            <Image src={'/images/pastaEmigre.svg'} alt='flag' width={534} height={355} layout='responsive' />
          </div>
        </div>
        <div className='flex justify-center w-full my-8 px-4 md:px-10 lg:px-10'>
          <div className='my-4 border-2 border-[#00B6FF] rounded-md w-full md:w-[60vw] lg:w-[60vw] p-4 md:p-14 lg:p-14 flex flex-col gap-4 bg-white'>
            <div className='text-4xl font-bold border-b-2 p-4 border-[#00B6FF]'>

              Transformando o Processo Consular
            </div>
            <div className='flex flex-col gap-4 px-4'>
              <p>
                Agora, imagine um futuro diferente. Com a introdução de um novo sistema automatizado, a experiência de preenchimento dos formulários consulares passa por uma transformação radical.Você envia um formulário inteligente e “didático” ao seu cliente, simples e fácil de ser preenchido, com dicas de nossa IA (Inteligência Artificial) evitando a necessidade de eventual suporte de sua equipe.
              </p>
              <p className='text-[#FE7638]'>
                Automaticamente as informações dos clientes são transferidas diretamente para o sistema da USCIS criando o identificador da aplicação em menos de 10 minutos sem necessidade de interação humana, eliminando erros e reduzindo drasticamente o tempo gasto no preenchimento e envio do formulário.
              </p>
            </div>
            <div className='flex gap-4 items-start'>
              <Image src={'/images/check-outline.svg'} alt='check' width={26} height={26} />
              <p>
                Ao iniciar o uso do sistema, as informações dos clientes são transferidas automaticamente do questionário para o sistema consular. Este processo elimina os erros humanos e reduz drasticamente o tempo necessário para preencher e enviar os formulários.
              </p>
            </div>
            <div className='flex gap-4 items-start'>
              <Image src={'/images/check-outline.svg'} alt='check' width={26} height={26} />
              <p>
                Com a integração do e-filing do consulado, o envio das informações é feito de forma automatizada, e a revisão das informações torna-se muito mais simples e eficiente. Em vez de horas de trabalho, um processo inteiro pode ser concluído em até 10 minutos.
              </p>
            </div>
            <div className='flex gap-4 items-start'>
              <Image src={'/images/check-outline.svg'} alt='check' width={26} height={26} />
              <p>
                O sistema não só economiza tempo, mas também reduz o estresse e a carga de trabalho dos funcionários, permitindo que eles se concentrem em oferecer um atendimento mais personalizado e eficaz aos clientes.
              </p>
            </div>
            <div className='flex gap-4 items-start'>
              <Image src={'/images/check-outline.svg'} alt='check' width={26} height={26} />
              <p>
                A transformação digital não apenas agiliza o processo, mas também garante maior precisão e confiabilidade, proporcionando um alívio tão necessário para os profissionais de imigração e seus clientes. A jornada complicada e desafiadora do processo consular dá lugar a um caminho mais direto e sem obstáculos, redefinindo o futuro da imigração.”
              </p>
            </div>
          </div>
        </div>
        <div className='flex w-full px-4 justify-center'>
          <CtaButton className='py-7 bg-[#FE7638] '>
            <Link href={'/'} className=''>
              <span className={'flex items-center text-[18px] md:text-[24px] lg:text-[24px]  font-bold '}>
                <span>
                  <Trans i18nKey={'Pegue seu acesso ao Imigr-e Vistos'} />
                </span>

                {/* <ArrowRightIcon
              className={
                'h-4 animate-in fade-in slide-in-from-left-8' +
                ' delay-1000 duration-1000 zoom-in fill-mode-both'
              }
            /> */}
              </span>
            </Link>
          </CtaButton>
        </div>
      </div>
      <div className='relative w-full bg-[#1B2151] py-10 text-white flex flex-col gap-8'>
        <div className=' absolute top-[-19vw] left-0 w-[20vw]'>
          <Image src={'/images/flag-usa.svg'} alt='flag' width={357} height={398} layout='responsive' />
        </div>
        <div className='w-full flex items-center'>
          <div className='w-full border-[1px] border-white'></div>
          <div className='w-full border-[1px] border-white p-2 rounded-lg font-bold text-center'>
            A hora de agir é
            <span className='text-[#FE7638]'>
              AGORA
            </span>
            !
          </div>
          <div className='w-full border-[1px] border-white'></div>
        </div>
        <p className='font-bold text-4xl text-center'>
          Se você deseja aumentar sua eficiência, reduzir custos e expandir seus serviços.
        </p>
        <p className='text-center'>
          Apresentamos a solução que irá revolucionar seu escritório e colocá-lo à frente da concorrência.
        </p>
        <HowItWorks />
        <div className='flex w-full px-4 justify-center'>
          <CtaButton className='py-7 bg-[#FE7638] '>
            <Link href={'/'} className=''>
              <span className={'flex items-center text-[18px] md:text-[24px] lg:text-[24px]  font-bold '}>
                <span>
                  <Trans i18nKey={'Pegue seu acesso ao Imigr-e Vistos'} />
                </span>

                {/* <ArrowRightIcon
              className={
                'h-4 animate-in fade-in slide-in-from-left-8' +
                ' delay-1000 duration-1000 zoom-in fill-mode-both'
              }
            /> */}
              </span>
            </Link>
          </CtaButton>
        </div>
      </div>
      {/* <Sponsors />
      <Features />
      <About />
      <Team /> */}

      {/* <div className={'container mx-auto'}>
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
      </div> */}
    </div >
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
