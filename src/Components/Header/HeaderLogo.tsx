'use client'
import Link from "next/link";
import Image from 'next/image';
import { motion } from "motion/react";
import { FC } from "react";
import { HeaderFull } from "./headerFull";

interface HeaderLogoProps {
   children?: React.ReactNode;
   href?: string;
}

const HeaderLogo: FC<HeaderLogoProps> = ({children, href = "/"}) => {
  return (
      <HeaderFull>
         <Link href={href} className={'flex flex-col justify-center w-[75vw] max-w-[1000px] items-end select-none'}>
         {children}
         <motion.div className={'relative w-full h-auto'}
         initial={{opacity: .1, x: -200, filter: 'blur(5px)'}}
         animate={{opacity: 1, x: 0, filter: 'blur(0px)'}}
         >
            <Image draggable="false" src="/images/logo/LogoText.svg" alt="Logo Pixelgon" fill className={'!relative w-auto'} priority/>
         </motion.div>
         <motion.div 
         className="w-[65.25%] relative"
         initial={{opacity: .1, x: 200, filter: 'blur(5px)'}}
         animate={{opacity: 1, x: 0, filter: 'blur(0px)'}}
         >
            <Image draggable="false" src="/images/logo/Slogan.svg" alt="Logo Pixelgon" fill className={'!relative mt-[1vw]'} priority/>
         </motion.div>
         </Link>
      </HeaderFull>
  );
}


export default HeaderLogo;