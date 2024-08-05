'use client'
import { GiftIcon, MapIcon, MedalIcon, PlaneIcon } from "./icons";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";





interface FeatureProps {
    avatar: JSX.Element;
    name: string;
    position: string;
    description: string;
    rate: number;
}


const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
};

const features: FeatureProps[] = [
    {
        rate: 4,
        avatar: <Image alt="icon" src={'/images/icons/feedbacks/person_1.svg'} width={40} height={40} />,
        name: 'Ana Silva',
        position: 'Advogada de Imigração',
        description: 'Desde que adotamos essa solução, nossa eficiência disparou. Aceitamos mais casos e nossos clientes estão mais satisfeitos."'
    },
    {
        rate: 4,
        avatar: <Image alt="icon" src={'/images/icons/feedbacks/person_2.svg'} width={40} height={40} />,
        name: 'João Pereira',
        position: 'Consultor Jurídico',
        description: 'Expandimos nossos serviços para incluir vistos americanos e vimos um aumento imediato nos lucros. É uma ferramenta indispensável'
    },
];


export const Feedbacks = () => {
    return (
        <section
            id="feedbacks"
        >
            <div className="w-full flex justify-between">
                <div className="w-[40%] px-4 lg:px-0">
                    <div className="text-[#00B6FF] font-bold">feedback dos Clientes</div>
                    <div className="text-2xl font-bold text-[#1B2151] py-2">
                        O Que Nossos Clientes Estão Dizendo:
                    </div>
                    <div className="text-[#6E6E6E] pt-4">
                        O que nos motiva é o sucesso e a satisfação dos nossos clientes. Suas conquistas e feedback positivo são o combustível que impulsiona nossa dedicação.
                    </div>
                </div>
                <div className="">
                    <div className="w-full">

                    </div>
                </div>
            </div>

        </section >
    );
};
