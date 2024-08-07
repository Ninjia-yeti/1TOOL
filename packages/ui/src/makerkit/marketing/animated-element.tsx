'use client'
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface WithAnimationProps {
    children: ReactNode;
    mode: string;
}

export const WithAnimation = ({ children, mode }: WithAnimationProps) => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    const variants =
        mode === 'zoom' ?
            {
                hidden: {
                    opacity: 0,
                    y: 50,
                    scale: 0.5
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1.0
                },
            } :
            {
                hidden: {
                    opacity: 0,
                    y: 50,
                },
                visible: {
                    opacity: 1,
                    y: 0,
                },
            }
        ;

    return (
        <motion.div
            ref={ref as React.Ref<HTMLDivElement>}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={variants}
            transition={{
                duration: mode === 'zoom' ? 0.5 : 0.7,
                ease: 'backInOut'
            }}
        >
            {children}
        </motion.div>
    );
};
