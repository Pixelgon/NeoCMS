'use client';
import { motion } from "motion/react";
import { FC } from "react";

interface HeaderProps {
    bg: string;
    title: string;
}

export const Header: FC<HeaderProps> = ({bg,title}) => {
  return (
    <header className={'min-h-[33svh] select-none bg-cover bg-fixed before:bg-header-gradient before:absolute flex flex-col justify-center items-center before:top-0 before:left-0 before:w-full before:h-full before:z-[0] relative'} style={{backgroundImage: `url(${bg})`}}>
        <motion.h1 
          className={'relative z-10'}
          initial={{opacity: .1, scale: 0}}
          animate={{opacity: 1, scale: 1}
        }
        >
          {title}
        </motion.h1>
    </header>
  );
}