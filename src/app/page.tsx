import Image from 'next/image';
import { Btn } from '@/components/layout/btn';
import BlockCard from '@/components/layout/blockCard';
import { Section } from '@/components/layout/section';
import { Metadata } from 'next';
import HeaderLogo from '@/components/header/headerLogo';
import * as motion from "motion/react-client";
import GetLastTwoProjects from '@/utils/project/getLastTwoProjects';
import ProjectHM from '@/components/project/projectHM';
import Block from '@/components/block/block';
 

export const metadata: Metadata = {
  title: 'Pixelgon - Your vision, our code',
  description: 'Digitální parťák pro vaše projekty. Navrhujeme a vyvíjíme weby, aplikace a digitální řešení, která nejsou jen vizuálně přívětivá, ale efektivní a jedinečná.',
  keywords: ['web design', 'app development', 'digitální řešení', 'progresivní webové aplikace', 'e-commerce', 'Pixelgon'],
}

export default async function Home() {

const lastProjects = await GetLastTwoProjects();

return (
  <>
    <main>
      <HeaderLogo href={'#intro'}>
        <h1 className={'absolute left-[-10000px]'}>
            Pixelgon
         </h1>
         <p className={'absolute left-[-10000px]'}>Your vision, our code</p>
      </HeaderLogo>
      <Section isPrim>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-14 w-full items-center" id="intro">
          <div className={'flex flex-col items-start gap-4'}>
            <motion.div
              initial={{opacity: .1, scale: 0}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{ once: true }}
            >
              <Block id='intro_title'/>
            </motion.div>
            <Block id='intro_desc'/>
            <Btn href="/projekty" prim className={'text-xl mt-4'}>Přesvědčit se</Btn>
          </div>
          <motion.div initial={{opacity: .1, scale: 0}}
              whileInView={{opacity: 1, scale: 1,}}
              viewport={{ once: true }} className={'relative h-fit'}>
            <Image src={'/images/icons/laptop.webp'} fill sizes="50vw" alt="" className={'!relative object-contain w-full drop-shadow-2xl z-10'}/>
            <div className={'absolute top-[2%] left-[10%] w-[80%] h-[86%] z-0 screen'}>
              <motion.div initial={{animationPlayState: 'paused'}} whileInView={{animationPlayState: 'running'}} viewport={{once: true}} className={'screen__foto screen__foto--hruba'}></motion.div>
              <motion.div initial={{animationPlayState: 'paused'}} whileInView={{animationPlayState: 'running'}} viewport={{once: true}} className={'screen__foto screen__foto--chalupa'}></motion.div>
            </div>
          </motion.div>
        </div>
      </Section>
      <Section>
        <Block id='service_title'/>
        <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-reg lg:gap-8 w-full'}>
            <BlockCard id='web' iconPath='/images/icons/web.svg' />
            <BlockCard id='design' iconPath='/images/icons/design.svg' delay={.3} />
            <BlockCard id='code' iconPath='/images/icons/code.svg' delay={.6} />
        </div>
        <Btn href="/o-nas" className={'text-xl'}>Naše vize</Btn>
      </Section>
      <ProjectHM projects={lastProjects} />
    </main>
  </>
);
};
