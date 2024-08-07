import Link from 'next/link';


import Image from 'next/image';

import {
  CtaButton,
  Services,
  Feedbacks,
} from '@kit/ui/marketing';
import { WithAnimation } from '@kit/ui/marketing';
import { LottieLoader } from '@kit/ui/marketing';
import flag from '~/(marketing)/_components/lottie-jsons/flag.json';

import { Trans } from '@kit/ui/trans';

import { withI18n } from '~/lib/i18n/with-i18n';

function Home() {
  return (
    <div className={' flex flex-col space-y-6 md:space-y-8 lg:space-y-8 pt-2 md:pt-14 lg:pt-14 justify-center items-center text-[#1B2151] bg-[#F4F4F4]'}>
      <section className="py-12 px-4 max-w-[100vw]">
        <WithAnimation mode='zoom'>
          <h1 className="hidden md:block lg:block text-[16px] md:text-[40px] lg:text-[40px] font-bold px-0 md:px-[20vw] lg:px-[20vw] leading-[20px] md:leading-[45px] lg:leading-[45px] text-center mb-4 text-[#1B2151]">
            Você está prestes a ser apresentado<br />
            a Revolução no <span className="text-orange-500">Processamento</span>  de Vistos Americanos que vai redefinir o mercado de assessoria  de imigração americana.
          </h1>
          <h1 className="block md:hidden lg:hidden text-[16px] md:text-[40px] lg:text-[40px] font-bold px-0 md:px-[20vw] lg:px-[20vw] leading-[20px] md:leading-[45px] lg:leading-[45px] text-center mb-4 text-[#1B2151]">
            Você está prestes a ser apresentado<br />
            a Revolução no <span className="text-orange-500">Processamento</span><br />  de Vistos Americanos que vai<br /> redefinir o mercado de assessoria  de<br /> imigração americana.
          </h1>
        </WithAnimation>
        <WithAnimation mode='zoom'>
          <p className=" text-[12px] md:text-[20px] mb-8 text-center px-4  md:px-80 lg:px-[30vw]  text-[#1B2151]">
            Transforme Seu Escritório de Assessoria de Imigração Americana e Aumente Seus Lucros com a Imigr-e Vistos,
            nossa Solução Avançada de Preenchimento e Envio Automático de Formulários (DS-160) para o Consulado Americano.
          </p>
        </WithAnimation>
        <WithAnimation mode='up'>
          <p className=' text-[18px] md:text-[28px] lg:text-[28px] text-center font-bold'>
            CLIQUE E ASSISTA O VÍDEO
          </p>
        </WithAnimation>
      </section >
      <section
        className='hidden md:flex lg:flex relative w-full px-4 md:px-8 lg:px-8  m-0 items-center justify-center'>
        <div className=' absolute rotate-6 w-[30vw] top-[-21vw] right-0'>
          <WithAnimation mode='zoom'>
            <LottieLoader animationPath={flag} />
          </WithAnimation>
        </div>
        <WithAnimation mode='up'>
          <div className='bg-[#232A66] w-2 md:w-[15vw] lg:w-[15vw] h-[20vw] rounded-l-md'></div>
        </WithAnimation>
        <div className='w-full md:w-[70vw] lg:w-[70vw]'>
          <WithAnimation mode='up'>
            <Image src='/images/Video.svg' alt='video' width={1100} height={426} className='right-0 z-10' layout='responsive' />
          </WithAnimation>
        </div>
        <WithAnimation mode='up'>
          <div className='bg-[#232A66] w-2 md:w-[15vw] lg:w-[15vw] h-[20vw] rounded-r-md'></div>
        </WithAnimation>
      </section>
      <section
        style={{
          marginTop: '0px'
        }}
        className='flex md:hidden lg:hidden relative w-full px-4 md:px-8 lg:px-8  m-0 items-center justify-center'>
        <div className=' absolute w-[30vw] top-[-28vw] right-0'>
          <WithAnimation mode='zoom'>
            <Image src={'/images/flag-usa.svg'} alt='flag' width={357} height={398} layout='responsive' />
          </WithAnimation>
        </div>
        <WithAnimation mode='up'>
          <div className='bg-[#232A66] w-2 md:w-[15vw] lg:w-[15vw] h-[20vw] rounded-l-md'></div>
        </WithAnimation>
        <div className='w-full md:w-[70vw] lg:w-[70vw]'>
          <WithAnimation mode='up'>
            <Image src='/images/Video.svg' alt='video' width={1100} height={426} className='right-0 z-10' layout='responsive' />
          </WithAnimation>
        </div>
        <WithAnimation mode='up'>
          <div className='bg-[#232A66] w-2 md:w-[15vw] lg:w-[15vw] h-[20vw] rounded-r-md'></div>
        </WithAnimation>
      </section>
      <div className='w-full'>
        <WithAnimation mode='up'>
          <div className=' flex w-full px-2 md:px-4 lg:px-4  justify-center'>
            <CtaButton className='py-4 md:py-7 lg:py-7 bg-[#FE7638] '>
              <Link href={'/'} className=''>
                <span className={'flex items-center text-[13px]  md:text-[24px] lg:text-[24px]  font-bold '}>
                  <span>
                    <Trans i18nKey={'Pegue seu acesso ao Imigr-e Vistos'} />
                  </span>
                </span>
              </Link>
            </CtaButton>
          </div>
        </WithAnimation>
        <WithAnimation mode='up'>
          <p className=' flex uppercase justify-center text-[18px] lg:text-[28px] font-bold text-[#1B2151] py-5'>
            A Revolução Digital
          </p>
        </WithAnimation>
        <div className=' w-full'>
          <div className='block md:hidden lg:hidden px-4'>
            <WithAnimation mode='zoom'>
              <Image src={'/images/pastaEmigre.svg'} alt='flag' width={534} height={355} layout='responsive' />
            </WithAnimation>
          </div>
        </div>
        <div className=' z-20 relative w-full'>
          <div className='hidden md:block lg:block absolute right-[50px] bottom-[-190px]'>
            <WithAnimation mode='zoom'>
              <Image src={'/images/pastaEmigre.svg'} alt='flag' width={534} height={355} layout='responsive' />
            </WithAnimation>
          </div>
        </div>
        <div className=' flex justify-center w-full px-4 my-6 md:px-10 lg:px-10'>
          <div className='my-4 border-2 text-[#1B2151] border-[#00B6FF] rounded-md w-full md:w-[60vw] lg:w-[60vw] p-4 md:p-14 lg:p-14 pt-4 md:pt-10 lg:pt-10  flex flex-col gap-4 bg-white'>
            <WithAnimation mode='up'>
              <div className='text-[32px] md:text-[35px] lg:text-[35px] leading-[30px] font-bold border-b-2 p-4 border-[#00B6FF]'>
                Transformando o Processo Consular
              </div>
            </WithAnimation>
            <div className='flex flex-col gap-6'>
              <WithAnimation mode='up'>
                <div className='] flex flex-col gap-4 px-4'>
                  <p>
                    Agora, imagine um futuro diferente. Com a introdução de um novo sistema automatizado, a experiência de preenchimento dos formulários consulares passa por uma transformação radical.Você envia um formulário inteligente e “didático” ao seu cliente, simples e fácil de ser preenchido, com dicas de nossa IA (Inteligência Artificial) evitando a necessidade de eventual suporte de sua equipe.
                  </p>
                  <p className='text-[#FE7638]'>
                    Automaticamente as informações dos clientes são transferidas diretamente para o sistema da USCIS criando o identificador da aplicação em menos de 10 minutos sem necessidade de interação humana, eliminando erros e reduzindo drasticamente o tempo gasto no preenchimento e envio do formulário.
                  </p>
                </div>
              </WithAnimation>
              <WithAnimation mode='up'>
                <div className=' flex gap-4 items-start'>
                  <Image src={'/images/check-outline.svg'} alt='check' width={26} height={26} />
                  <p>
                    Ao iniciar o uso do sistema, as informações dos clientes são transferidas automaticamente do questionário para o sistema consular. Este processo elimina os erros humanos e reduz drasticamente o tempo necessário para preencher e enviar os formulários.
                  </p>
                </div>
              </WithAnimation>
              <WithAnimation mode='up'>
                <div className=' flex gap-4 items-start'>
                  <Image src={'/images/check-outline.svg'} alt='check' width={26} height={26} />
                  <p>
                    Com a integração do e-filing do consulado, o envio das informações é feito de forma automatizada, e a revisão das informações torna-se muito mais simples e eficiente. Em vez de horas de trabalho, um processo inteiro pode ser concluído em até 10 minutos.
                  </p>
                </div>
              </WithAnimation>
              <WithAnimation mode='up'>
                <div className=' flex gap-4 items-start'>
                  <Image src={'/images/check-outline.svg'} alt='check' width={26} height={26} />
                  <p>
                    O sistema não só economiza tempo, mas também reduz o estresse e a carga de trabalho dos funcionários, permitindo que eles se concentrem em oferecer um atendimento mais personalizado e eficaz aos clientes.
                  </p>
                </div>
              </WithAnimation>
              <WithAnimation mode='up'>
                <div className=' flex gap-4 items-start'>
                  <Image src={'/images/check-outline.svg'} alt='check' width={26} height={26} />
                  <p>
                    A transformação digital não apenas agiliza o processo, mas também garante maior precisão e confiabilidade, proporcionando um alívio tão necessário para os profissionais de imigração e seus clientes. A jornada complicada e desafiadora do processo consular dá lugar a um caminho mais direto e sem obstáculos, redefinindo o futuro da imigração.”
                  </p>
                </div>
              </WithAnimation>
            </div>
          </div>
        </div>
        <WithAnimation mode='up'>
          <div className=' flex w-full pb-6 px-2 md:px-4 lg:px-4 justify-center'>
            <CtaButton className='py-4 md:py-7 lg:py-7 bg-[#FE7638] '>
              <Link href={'/'} className=''>
                <span className={'flex items-center text-[13px]  md:text-[24px] lg:text-[24px]  font-bold '}>
                  <span>
                    <Trans i18nKey={'Pegue seu acesso ao Imigr-e Vistos'} />
                  </span>
                </span>
              </Link>
            </CtaButton>
          </div>
        </WithAnimation>
      </div>
      <div className='relative w-full bg-[#1B2151] py-10 my-6 text-white flex flex-col gap-20'>
        <div className='  rotate-45 absolute top-[-10vw] left-0 w-[20vw]'>
          <WithAnimation mode='zoom'>
            <LottieLoader animationPath={flag} />
          </WithAnimation>
        </div>
        <div className=' text-[20px] md:text-[32px] lg:text-[32px] w-full flex items-center'>
          <div className='w-full border-[1px] border-white'></div>
          <div className='hidden md:block lg:block w-full border-[1px] border-white p-2 rounded-lg font-bold text-center'>
            A hora de agir é
            <span className='text-[#FE7638]'>
              AGORA
            </span>
            !
          </div>
          <div className='block md:hidden lg:hidden min-w-[70%] w-full border-[1px] border-white p-2 rounded-lg font-bold text-center'>
            A hora de agir é
            <span className='text-[#FE7638]'>
              AGORA
            </span>
            !
          </div>
          <div className='w-full border-[1px] border-white'></div>
        </div>
        <WithAnimation mode='zoom'>
          <p className='font-bold px-5 text-[32px] md:text-[32px] lg:text-[32px]  md:px-[20vw]  lg:px-[20vw] text-center'>
            Se você deseja aumentar sua eficiência, reduzir custos e expandir seus serviços.
          </p>
        </WithAnimation>
        <WithAnimation mode='up'>
          <p className='hidden md:block lg:block text-[20px]  text-center px-4'>
            Apresentamos a solução que irá revolucionar seu escritório e<br />  colocá-lo à frente da concorrência.
          </p>
          <p className='block md:hidden lg:hidden text-[20px]  text-center px-4'>
            Apresentamos a solução que irá revolucionar seu escritório e  colocá-lo à frente da concorrência.
          </p>
        </WithAnimation>
        <div className=''>
          <Services />
        </div>
        <WithAnimation mode='zoom'>
          <div className=' flex w-full px-2 md:px-4 pb-14 md:pb-20 lg:pb-20 lg:px-4 justify-center'>
            <CtaButton className='py-4 md:py-7 lg:py-7 bg-[#FE7638] '>
              <Link href={'/'} className=''>
                <span className={'flex items-center text-[13px]  md:text-[24px] lg:text-[24px]  font-bold '}>
                  <span>
                    <Trans i18nKey={'Pegue seu acesso ao Imigr-e Vistos'} />
                  </span>
                </span>
              </Link>
            </CtaButton>
          </div>
        </WithAnimation>
      </div>
      <div className=' relative w-full py-10 text-white '>
        <Feedbacks />
      </div>
      <div className='bg-[#1B2151] py-16 w-full text-white'>
        <div className='text-center'>
          <WithAnimation mode='zoom'>
            <p className='uppercase text-[32px] md:text-[46px] lg:text-[46px] py-16  md:text-4xl lg:text-4xl  sm:px-4 md:px-0 lg:px-0 text-center font-bold'>
              A Oportunidade é Agora!
            </p>
          </WithAnimation>
          <WithAnimation mode='zoom'>
            <div className=' flex w-full px-2 pt-12 md:px-4 lg:px-4 justify-center'>
              <CtaButton className=' py-4 md:py-7 lg:py-7 bg-[#FE7638] '>
                <Link href={'/'} className=''>
                  <span className={'flex items-center text-[13px]  md:text-[24px] lg:text-[24px]  font-bold '}>
                    <span>
                      <Trans i18nKey={'Pegue seu acesso ao Imigr-e Vistos'} />
                    </span>
                  </span>
                </Link>
              </CtaButton>
            </div>
          </WithAnimation>
          <WithAnimation mode='up'>
            <div className='text-center uppercase px-10 text-[20px] pt-60 pb-32 font-medium'>
              BLOCO PLACEHOLDER - O QUE VAMOS ENTREGAR NO MVP
            </div>
          </WithAnimation>
          <WithAnimation mode='up'>
            <div className='text-center px-6 text-[20px] py-20 sm:w-full md:w-[50%] lg:w-[50%] m-auto'>
              Não deixe que seus concorrentes tomem a frente.
              Adote nossa solução<br /> hoje e veja a diferença imediata em sua prática.
              Solicite uma<br /> demonstração GRATUITA e veja como podemos transformar seu negocio!
            </div>
          </WithAnimation>
        </div>
      </div>
    </div >
  );
}

export default withI18n(Home);

