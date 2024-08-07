'use client'
import Lottie from "lottie-react";
import React from "react";

interface LottieLoaderProps {
    animationPath: any
}

export const LottieLoader = ({ animationPath }: LottieLoaderProps) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationPath,
        style: {
            width: '95%',
        }
    };

    return (
        <Lottie {...defaultOptions} />
    );
};
