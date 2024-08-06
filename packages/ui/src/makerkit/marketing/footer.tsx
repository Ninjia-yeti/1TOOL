import Image from "next/legacy/image";
import { Button } from "../../shadcn/button";
import { Input } from "../../shadcn/input";
export const Footer = () => {
  return (
    <footer className=" text-white bg-[#1B2151] border-0">
      <div className="hidden md:block lg:block px-60">
        <div className="flex py-20 lg:flex-row md:flex-col justify-between">
          <div className="w-full lg:w-[40%]">
            <div className="animation-element appear py-20 pt-40">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </div>
            <div className="animation-element appear flex gap-4">
              <Image alt="social" src='/images/socials/social_1.svg' width={40} height={40} />
              <Image alt="social" src='/images/socials/social_2.svg' width={40} height={40} />
              <Image alt="social" src='/images/socials/social_3.svg' width={40} height={40} />
              <Image alt="social" src='/images/socials/social_4.svg' width={40} height={40} />
              <Image alt="social" src='/images/socials/social_5.svg' width={40} height={40} />
              <Image alt="social" src='/images/socials/social_6.svg' width={40} height={40} />
            </div>
          </div>
          <div className="flex gap-20">
            <div>
              <div className="animation-element appear text-2xl py-20 font-bold">
                Institucional
              </div>
              <div className="flex flex-col gap-4">
                <div className="animation-element appear flex gap-4 items-center">
                  <Image alt="triangle" src={'/images/Icons/Triangle.svg'} width={10} height={10}></Image>
                  <div className="flex gap-4">
                    Nossos Processos
                  </div>
                </div>
                <div className="animation-element appear flex gap-4 items-center">
                  <Image alt="triangle" src={'/images/Icons/Triangle.svg'} width={10} height={10}></Image>
                  <div className="flex gap-4">
                    Blog
                  </div>
                </div>
                <div className="animation-element appear flex gap-4 items-center">
                  <Image alt="triangle" src={'/images/Icons/Triangle.svg'} width={10} height={10}></Image>
                  <div className="flex gap-4">
                    Comunidade
                  </div>
                </div>
                <div className="animation-element appear flex gap-4 items-center">
                  <Image alt="triangle" src={'/images/Icons/Triangle.svg'} width={10} height={10}></Image>
                  <div className="flex gap-4">
                    Quem Somos
                  </div>
                </div>

              </div>
            </div>
            <div>
              <div className="animation-element appear text-2xl py-20 font-bold">
                Contato
              </div>
              <div className="flex flex-col gap-4">
                <div className="animation-element appear flex gap-4 items-center">
                  <Image alt="triangle" src={'/images/Icons/Mail.svg'} width={20} height={20}></Image>
                  <div className="flex gap-4">
                    hello@imigre.ai
                  </div>
                </div>
                <Input placeholder="Digite o seu Email" className="animation-element appear bg-white text-black py-8 w-[300px]" />
                <div>
                  <Button variant={'default'} className="animation-element appear bg-[#00B6FF] py-8 px-16">
                    Inscreva-se
                  </Button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-20 lg:px-20">
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


