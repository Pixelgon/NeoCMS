'use client';
import { HeaderFull } from "@/components/Header/headerFull";
import { Btn } from "@/components/Layout/btn";
import { Card } from "@/components/Layout/card";
import { Section } from "@/components/Layout/section";
import Image from 'next/image';
import Link from "next/link";
import { motion } from "framer-motion";



export default function Home() {

return (
  <>
    <HeaderFull>
      <Link href={'#intro'} className={'flex flex-col justify-center w-[75vw] max-w-[1000px] items-end select-none'}>
        <h1 className={'absolute left-[-10000px]'}>
          Pixelgon
        </h1>
        <p className={'absolute left-[-10000px]'}>Your vision, our code</p>
        <motion.div className={'relative w-full h-auto'}
        initial={{opacity: 0, x: -200, filter: 'blur(5px)'}}
        animate={{opacity: 1, x: 0, filter: 'blur(0px)'}}
        >
          <Image draggable="false" src="/logo/LogoText.svg" alt="Logo Pixelgon" fill className={'!relative w-auto'}/>
        </motion.div>
        <motion.div 
        className="w-[65.25%] relative"
        initial={{opacity: 0, x: 200, filter: 'blur(5px)'}}
        animate={{opacity: 1, x: 0, filter: 'blur(0px)'}}
        >
          <Image draggable="false" src="/logo/Slogan.svg" alt="Logo Pixelgon" fill className={'!relative mt-[1vw]'}/>
        </motion.div>
      </Link>
    </HeaderFull>
    <main>
      <Section isPrim>
        <h2 id="intro">
          Precizně napsaný web
        </h2>
        <p>
          V dnešní době je nezbytné mít pro úspěch digitální identitu, ale musíte se odlišit. Naší prioritou při tvorbě webových stránek je neotřelý funkční design, technické zpracování, efektivní SEO a samozřejmě individuální přístup ke každému projektu. Nevěříte?
        </p>
        <Btn href="/projekty" prim className={'text-xl'}>Přesvědčit se</Btn>
      </Section>
      <Section>
        <h2>Naše doména</h2>
        <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-4 lg:gap-12 w-full'}>
          <Card>
            <div className={'flex gap-2 relative'}>
              <Image alt="" src={'/icons/web.svg'} fill className={'!relative h-full w-auto'}/>
              <h3>Web</h3>
            </div>
            <p className={'text-center'}>Tvořím statické webové stránky klasicky pomocí HTML, CSS a JavaScriptu. Webové stránky také vytvářím v CMS jako je Wordpress a to hlavně společně s pluginem Divi. Pro složitější stránky používám framework Django.</p>
          </Card>
          <Card>
            <div className={'flex gap-2 relative'}>
              <Image alt="" src={'/icons/design.svg'} fill className={'!relative h-full w-auto'}/>
              <h3>Design</h3>
            </div>
            <p className={'text-center'}>Tvořím vektorovou grafiku pomocí programu Inkscape, fotografuji a následně upravuji fotky v Affinity Photo a občas tvořím 3D grafiku pomocí programů jako Blender nebo Cinema 4D.</p>
          </Card>
          <Card>
            <div className={'flex gap-2 relative'}>
              <Image alt="" src={'/icons/code.svg'} width={0} height={0} className={'!relative h-full w-auto'}/>
              <h3>Code</h3>
            </div>
            <p className={'text-center'}>Mám zkušenosti s vývojem softwaru v Pythonu, C# a Java. Také mám zkušenosti s vývojem her přes enginy jako je Construct nebo Unreal Engine.</p>
          </Card>
        </div>
      </Section>
      <Section isPrim>
        <h2>Poslední projekty</h2>
      </Section>
    </main>
  </>
);
};
