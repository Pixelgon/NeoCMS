'use client'
import { motion } from "motion/react";
import { FC, PropsWithChildren } from "react";

interface CardProps {
    children: React.ReactNode;
    delay?: number;
    sec?: boolean;
}


export const Card: FC<CardProps> = ({children, delay, sec}) => {
    return(
        <motion.article 
            initial={{opacity: .1, scale: 0}}
            whileInView={{opacity: 1, scale: 1}}
            transition={{delay: delay ? delay : 0}}
            viewport={{ once: true, amount: 0.2 }}
        className={'flex flex-col gap-3 items-center rounded-3xl p-14 relative h-full '+ (sec ? 'bg-sec' : 'bg-bg')}>
            {children}
        </motion.article>
    );
}