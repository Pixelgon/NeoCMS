'use client'
import { motion } from "motion/react";
import { FC } from "react";

interface CardProps {
    children: React.ReactNode;
    delay?: number;
    sec?: boolean;
    className?: string;
}


export const Card: FC<CardProps> = ({children, delay, sec, className}) => {
    return(
        <motion.article 
            initial={{opacity: .1, scale: 0}}
            whileInView={{opacity: 1, scale: 1}}
            transition={{delay: delay ? delay : 0}}
            viewport={{ once: true, amount: .01 }}
            className={'flex flex-col gap-3 items-center rounded-3xl p-14 relative h-full '+ (sec ? 'bg-sec' : 'bg-bg') + (className ? ' ' + className : '')}>
            {children}
        </motion.article>
    );
}