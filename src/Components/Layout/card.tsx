import { motion } from "motion/react";
import { FC, PropsWithChildren } from "react";

interface CardProps {
    children: React.ReactNode;
    delay?: number;
}


export const Card: FC<CardProps> = ({children, delay}) => {
    return(
        <motion.article 
            initial={{opacity: .1, scale: 0}}
            whileInView={{opacity: 1, scale: 1}}
            transition={{delay: delay ? delay : 0}}
            viewport={{ once: true }}
        className={'flex flex-col gap-3 items-center bg-bg rounded-3xl p-14 relative h-full'}>
            {children}
        </motion.article>
    );
}