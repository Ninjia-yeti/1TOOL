'use client'
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";




interface FeatureProps {
    avatar: JSX.Element;
    name: string;
    position: string;
    description: string;
    rate: number;
}
interface ArrowProps {
    className: string,
    style: object,
    onClick: () => void
}


const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    // centerMode: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
};

const features: FeatureProps[] = [
    {
        rate: 5,
        avatar: <Image alt="icon" src={'/images/icons/feedbacks/person_1.svg'} width={50} height={50} />,
        name: 'Ana Silva',
        position: 'Advogada de Imigração',
        description: 'Desde que adotamos essa solução, nossa eficiência disparou. Aceitamos mais casos e nossos clientes estão mais satisfeitos."'
    },
    {
        rate: 5,
        avatar: <Image alt="icon" src={'/images/icons/feedbacks/person_2.svg'} width={50} height={50} />,
        name: 'João Pereira',
        position: 'Consultor Jurídico',
        description: 'Expandimos nossos serviços para incluir vistos americanos e vimos um aumento imediato nos lucros. É uma ferramenta indispensável'
    },
    {
        rate: 5,
        avatar: <Image alt="icon" src={'/images/icons/feedbacks/person_2.svg'} width={50} height={50} />,
        name: 'João Pereira',
        position: 'Consultor Jurídico',
        description: 'Expandimos nossos serviços para incluir vistos americanos e vimos um aumento imediato nos lucros. É uma ferramenta indispensável'
    },
];

function NextArrow(props?: ArrowProps) {
    const receivedProps = props ?? { className: '', style: {}, onClick: () => { } };
    const { className, onClick } = receivedProps;
    return (
        <div
            className={`${className} text-white bg-[#00B6FF]`}
            onClick={onClick}
        >
            <div className="bg-[#00B6FF] p-1 rounded-full">
                <Image alt="icon" src={'/images/icons/RightOutline.svg'} width={20} height={20} />,
            </div>
        </div>
    );
}

function PrevArrow(props?: ArrowProps) {
    const receivedProps = props ?? { className: '', style: {}, onClick: () => { } };
    const { className, style, onClick } = receivedProps;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        >
            <div className="bg-[#00B6FF] p-1 rounded-full">
                <Image alt="icon" src={'/images/icons/LeftOutline.svg'} width={20} height={20} />,
            </div>
        </div>
    );
}


export const Feedbacks = () => {
    return (
        <section
            id="feedbacks"
        >
            <div className="w-full flex  flex-col md:flex-row lg:flex-row justify-between">
                <div className="w-full md:w-[40%] lg:w-[40%] px-8 md:px-20 lg:px-20 ">
                    <div>
                        <div className="text-[#00B6FF] font-bold">feedback dos Clientes</div>
                        <div className="text-2xl font-bold text-[#1B2151] py-2">
                            O Que Nossos Clientes Estão Dizendo:
                        </div>
                        <div className="text-[#6E6E6E] pt-4">
                            O que nos motiva é o sucesso e a satisfação dos nossos clientes. Suas conquistas e feedback positivo são o combustível que impulsiona nossa dedicação.
                        </div>
                    </div>

                </div>
                <div className="hidden md:block lg:block w-full md:w-[60%] lg:w-[60%] text-black">
                    <Slider {...settings}>
                        {features.map((aFeedback, idx) => (
                            <div key={idx} className="px-2">
                                <div className="border-2 border-[#00B6FF] rounded-lg p-8" key={idx}>
                                    <div className="flex gap-1">
                                        {
                                            new Array(aFeedback.rate).fill(null).map((_, idx) => (
                                                <Image key={idx} src={'/images/Icons/Star.svg'} alt="star" width={20} height={20} />
                                            ))
                                        }
                                    </div>
                                    <div className="pt-2 pb-8 text-[#6E6E6E]">
                                        {aFeedback.description}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {aFeedback.avatar}
                                        <div>
                                            <div className="text-[#1B1717] font-bold leading-3	">
                                                {aFeedback.name}
                                            </div>
                                            <div className="text-[#232960]">
                                                {aFeedback.position}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="sm:block md:hidden lg:hidden w-[80%] m-auto md:w-[60%] lg:w-[60%] py-8 text-black">
                    <Slider
                        {...settings}
                        slidesToShow={1}
                        arrows={true}
                        nextArrow={NextArrow()}
                        prevArrow={PrevArrow()}

                    >
                        {features.map((aFeedback, idx) => (
                            <div key={idx} className="px-2">
                                <div className="border-2 border-[#00B6FF] rounded-lg p-8" key={idx}>
                                    <div className="flex gap-1">
                                        {
                                            new Array(aFeedback.rate).fill(null).map((_, idx) => (
                                                <Image key={idx} src={'/images/Icons/Star.svg'} alt="star" width={20} height={20} />
                                            ))
                                        }
                                    </div>
                                    <div className="pt-2 pb-8 text-[#6E6E6E]">
                                        {aFeedback.description}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {aFeedback.avatar}
                                        <div>
                                            <div className="text-[#1B1717] font-bold leading-3	">
                                                {aFeedback.name}
                                            </div>
                                            <div className="text-[#232960]">
                                                {aFeedback.position}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

        </section >
    );
};
