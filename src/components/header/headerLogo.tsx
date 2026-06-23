'use client'
import Link from "next/link";
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { FC, useRef } from "react";
import { HeaderFull } from "./headerFull";

const MotionLink = motion.create(Link);

interface HeaderLogoProps {
   children?: React.ReactNode;
   href?: string;
}

const HeaderLogo: FC<HeaderLogoProps> = ({children, href = "/"}) => {
  const headerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });
  const logoTextX = useTransform(scrollYProgress, [0, 1], ["0vw", "-12vw"]);
  const sloganX = useTransform(scrollYProgress, [0, 1], ["0vw", "12vw"]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [1, .1]);
  const scrollBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(5px)"]);

  return (
      <HeaderFull ref={headerRef}>
         <MotionLink href={href} className={'flex flex-col justify-center w-[75vw] max-w-[1000px] items-end select-none'} style={shouldReduceMotion ? undefined : {opacity: scrollOpacity, filter: scrollBlur}}>
         {children}
         <motion.div className={'relative w-full h-auto'} style={{x: shouldReduceMotion ? 0 : logoTextX}}>
            <motion.div
            className={'relative w-full h-auto'}
            initial={shouldReduceMotion ? false : {opacity: .1, x: -200, filter: 'blur(5px)'}}
            animate={{opacity: 1, x: 0, filter: 'blur(0px)'}}
            >
               <Image draggable="false" src="/images/logo/LogoText.svg" alt="Logo Pixelgon" fill className={'!relative w-auto'} loading="eager" priority/>
            </motion.div>
         </motion.div>
         <motion.div className="w-[65.25%] relative" style={{x: shouldReduceMotion ? 0 : sloganX}}>
            <motion.div
            className="relative"
            initial={shouldReduceMotion ? false : {opacity: .1, x: 200, filter: 'blur(5px)'}}
            animate={{opacity: 1, x: 0, filter: 'blur(0px)'}}
            >
               <Image draggable="false" src="/images/logo/Slogan.svg" alt="Logo Pixelgon" fill className={'!relative mt-[1vw]'} loading="eager" priority/>
            </motion.div>
         </motion.div>
         </MotionLink>
      </HeaderFull>
  );
}


export default HeaderLogo;
