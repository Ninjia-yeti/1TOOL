'use client'
import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/card";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}


const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const features: FeatureProps[] = [
  {
    icon: <Image alt="icon" src={'/images/icons/services/service_1.svg'} width={40} height={40} />,
    title: "Redução Imediata de Tempo e Custos:",
    description:
      "Nosso sistema automatiza o preenchimento dos formulários DS-160, economizando horas preciosas em cada caso. Tempo é dinheiro - não perca mais nenhum minuto com processos manuais e ineficientes.",
  },
  {
    icon: <Image alt="icon" src={'/images/icons/services/service_2.svg'} width={40} height={40} />,
    title: "Precisão Garantida:",
    description:
      "Desenvolvido com os melhores especialistas em imigração, nosso software elimina erros comuns e garante total conformidade. Evite retrabalho e problemas com a imigração.",
  },
  {
    icon: <Image alt="icon" src={'/images/icons/services/service_3.svg'} width={40} height={40} />,
    title: "Fácil Implantar:",
    description:
      "Com uma interface amigável, nosso sistema é rápido e fácil de implantar. Você e sua equipe estarão prontos para usar em questão de horas, não dias.",
  },
  {
    icon: <Image alt="icon" src={'/images/icons/services/service_4.svg'} width={40} height={40} />,
    title: "Expansão de Serviços Imediata:",
    description:
      "Ainda não oferece serviços de imigração? Esta é sua chance de começar AGORA! Nossa solução torna simples e rentável adicionar a assessoria de vistos americanos ao seu portfólio.",
  },
  {
    icon: <Image alt="icon" src={'/images/icons/services/service_5.svg'} width={40} height={40} />,
    title: "Suporte e Atualizações Contínuas:",
    description:
      "Não está sozinho! Oferecemos suporte contínuo e atualizações regulares para garantir que você esteja sempre à frente com as melhores ferramentas e informações.",
  },
];

interface ArrowProps {
  className: string,
  style: object,
  onClick: () => void
}

function SampleNextArrow(props?: ArrowProps) {
  const receivedProps = props ?? { className: '', style: {}, onClick: () => { } };
  const { className, onClick } = receivedProps;
  return (
    <div
      className={`${className} text-white`}
      onClick={onClick}
    >
      <ChevronRight />
    </div>
  );
}

function SamplePrevArrow(props?: ArrowProps) {
  const receivedProps = props ?? { className: '', style: {}, onClick: () => { } };
  const { className, style, onClick } = receivedProps;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      <ChevronLeft />
    </div>
  );
}

export const Services = () => {
  return (
    <section
      id="services"
    >

      <div className="hidden  lg:block w-full">
        <Slider {...settings}>
          {features.map(({ icon, title, description }: FeatureProps) => (
            <div className="p-4">
              <Card
                key={title}
                className="text-white border-[#464F97] h-[350px]"
              >
                <CardHeader>
                  <CardTitle className="py-4 font-bold grid gap-8 place-items-center">
                    {icon}
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>{description}</CardContent>
              </Card>
            </div>

          ))}
        </Slider>

      </div>
      <div className="hidden md:block lg:hidden w-full">
        <Slider {...settings} slidesToShow={3}>
          {features.map(({ icon, title, description }: FeatureProps) => (
            <div className="p-4">
              <Card
                key={title}
                className="text-white border-[#464F97] h-[420px]"
              >
                <CardHeader>
                  <CardTitle className="py-4 font-bold grid gap-8 place-items-center">
                    {icon}
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>{description}</CardContent>
              </Card>
            </div>

          ))}
        </Slider>

      </div>
      <div className="sm:block md:hidden lg:hidden m-auto w-[80%]">
        <Slider
          {...settings}
          slidesToShow={1}
          arrows={true}
          nextArrow={SampleNextArrow()}
          prevArrow={SamplePrevArrow()}
        >
          {features.map(({ icon, title, description }: FeatureProps) => (
            <div className="p-4">
              <Card
                key={title}
                className="text-white border-[#464F97] "
              >
                <CardHeader>
                  <CardTitle className="py-4 font-bold grid gap-8 place-items-center">
                    {icon}
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>{description}</CardContent>
              </Card>
            </div>

          ))}
        </Slider>

      </div>
    </section >
  );
};
