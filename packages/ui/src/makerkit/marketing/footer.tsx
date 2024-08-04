import Image from "next/image";
import { Button } from "../../shadcn/button";
import { Input } from "../../shadcn/input";
export const Footer = () => {
  return (
    <footer className=" text-white bg-[#1B2151] ">
      <div className="px-60">
        <div className="flex py-20 justify-between">
          <div className="w-[40%]">
            <div className="py-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </div>
            <div className="flex gap-4">
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
              <div className="text-2xl py-20 font-bold">
                Institucional
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <Image alt="triangle" src={'/images/Icons/Triangle.svg'} width={10} height={10}></Image>
                  <div className="flex gap-4">
                    Nossos Processos
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <Image alt="triangle" src={'/images/Icons/Triangle.svg'} width={10} height={10}></Image>
                  <div className="flex gap-4">
                    Blog
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <Image alt="triangle" src={'/images/Icons/Triangle.svg'} width={10} height={10}></Image>
                  <div className="flex gap-4">
                    Comunidade
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <Image alt="triangle" src={'/images/Icons/Triangle.svg'} width={10} height={10}></Image>
                  <div className="flex gap-4">
                    Quem Somos
                  </div>
                </div>

              </div>
            </div>
            <div>
              <div className="text-2xl py-20 font-bold">
                Contato
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <Image alt="triangle" src={'/images/Icons/Mail.svg'} width={20} height={20}></Image>
                  <div className="flex gap-4">
                    hello@imigre.ai
                  </div>
                </div>
                <Input placeholder="Digite o seu Email" className="bg-white py-8 w-[250px]" />
                <div>
                  <Button variant={'default'} className="bg-[#00B6FF] py-8 px-16">
                    Inscreva-se
                  </Button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-20">
        <div className="px-20 py-8 border-t border-white/25 flex justify-between">
          <div>Copyright © 2024 | Todos os direitos reservados | Imigr-e</div>
          <div>Política de Privacidade | Termos de Uso | Legal | Vendas estornos | Sitemap</div>
        </div>
      </div>

    </footer >
  );
}


