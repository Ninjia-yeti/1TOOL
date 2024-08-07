import Image from "next/legacy/image";
import { Button } from "../../shadcn/button";
import { Input } from "../../shadcn/input";
import { WithAnimation } from "./animated-element";


interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ReactNode;
}

export const Footer = ({ logo }: FooterProps) => {
  return (
    <footer className=" text-white bg-[#1B2151] border-0">
      <div className="hidden md:block lg:block md:px-20 lg:px-60 ">
        <div className="flex py-20 lg:flex-row md:flex-col justify-between">
          <div className="w-full lg:w-[40%]">
            {/* <WithAnimation mode='zoom'>
              {logo}
            </WithAnimation> */}
            <WithAnimation mode='up'>
              <div className="py-20 text-[16px] pt-40">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </div>
            </WithAnimation>
            <WithAnimation mode='zoom'>
              <div className="flex gap-4">
                <Image alt="social" src='/images/socials/social_1.svg' width={40} height={40} />
                <Image alt="social" src='/images/socials/social_2.svg' width={40} height={40} />
                <Image alt="social" src='/images/socials/social_3.svg' width={40} height={40} />
                <Image alt="social" src='/images/socials/social_4.svg' width={40} height={40} />
                <Image alt="social" src='/images/socials/social_5.svg' width={40} height={40} />
                <Image alt="social" src='/images/socials/social_6.svg' width={40} height={40} />
              </div>
            </WithAnimation>
          </div>
          <div className="flex gap-20">
            <div>
              <WithAnimation mode='up'>
                <div className="text-[24px] py-20 font-bold">
                  Institucional
                </div>
              </WithAnimation>
              <div className="flex flex-col gap-4">
                <WithAnimation mode='up'>
                  <div className="flex gap-4 items-center">
                    <Image alt="triangle" src={'/images/Icons/Triangle.svg'} width={10} height={10}></Image>
                    <div className="flex gap-4">
                      Nossos Processos
                    </div>
                  </div>
                </WithAnimation>
                <WithAnimation mode='up'>
                  <div className="flex gap-4 items-center">
                    <Image alt="triangle" src={'/images/Icons/Triangle.svg'} width={10} height={10}></Image>
                    <div className="flex gap-4">
                      Blog
                    </div>
                  </div>
                </WithAnimation>
                <WithAnimation mode='up'>
                  <div className="flex gap-4 items-center">
                    <Image alt="triangle" src={'/images/Icons/Triangle.svg'} width={10} height={10}></Image>
                    <div className="flex gap-4">
                      Comunidade
                    </div>
                  </div>
                </WithAnimation>
                <WithAnimation mode='up'>
                  <div className="flex gap-4 items-center">
                    <Image alt="triangle" src={'/images/Icons/Triangle.svg'} width={10} height={10}></Image>
                    <div className="flex gap-4">
                      Quem Somos
                    </div>
                  </div>
                </WithAnimation>

              </div>
            </div>
            <div>
              <WithAnimation mode='up'>
                <div className="text-[24px] py-20 font-bold">
                  Contato
                </div>
              </WithAnimation>
              <div className="flex flex-col gap-4">
                <WithAnimation mode='up'>
                  <div className="flex gap-4 items-center">
                    <Image alt="triangle" src={'/images/Icons/Mail.svg'} width={20} height={20}></Image>
                    <div className="flex gap-4">
                      hello@imigre.ai
                    </div>
                  </div>
                </WithAnimation>
                <WithAnimation mode='up'>
                  <Input placeholder="Digite o seu Email" className="bg-white text-black py-8 w-[300px]" />
                </WithAnimation>
                <WithAnimation mode='up'>
                  <div>
                    <Button variant={'default'} className="bg-[#00B6FF] py-8 px-16">
                      Inscreva-se
                    </Button>
                  </div>
                </WithAnimation>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-20 lg:px-20 text-[12px]">
        <div className="px-4 md:px-20 lg:px-20 py-5 border-t border-white/25 flex flex-col md:flex-row lg:flex-row justify-between">
          <div className="hidden md:block lg:block">Copyright © 2024 | Todos os direitos reservados | Imigr-e</div>
          <div className="hidden md:block lg:block">Política de Privacidade | Termos de Uso | Legal | Vendas estornos | Sitemap</div>
          <div className="block md:hidden lg:hidden w-full text-center">Copyright © 2024 </div>
          <div className="block md:hidden lg:hidden w-full text-center">Todos os direitos reservados  imigr-e</div>

        </div>
      </div>

    </footer >
  );
}


