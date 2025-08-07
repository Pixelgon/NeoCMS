import Image from 'next/image';
import { Btn } from '@/components/layout/btn';
import { Card } from '@/components/layout/card';
import { Section } from '@/components/layout/section';
import { Metadata } from 'next';
import HeaderLogo from '@/components/header/headerLogo';
import * as motion from "motion/react-client";
import GetLastTwoProjects from '@/utils/project/getLastTwoProjects';
import ProjectHM from '@/components/project/projectHM';
 

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
            <motion.h2
              initial={{opacity: .1, scale: 0}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{ once: true }}
            >
              Váš digitální parťák
            </motion.h2>
            <p>
              Navrhujeme a vyvíjíme weby, aplikace a digitální řešení, která nejen dobře vypadají, ale hlavně dávají smysl. Vytvoříme vám silnou digitální identitu, která zaujme a odliší vás od konkurence – od designu přes vývoj až po nasazení.
            </p>
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
        <h2>Naše doména</h2>
        <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-reg lg:gap-8 w-full'}>
            <Card>
              <div className={'flex gap-2 relative items-center'}>
                <Image alt="" src={'/images/icons/web.svg'} width={0} height={0} className={'!relative max-h-full w-auto flex-shrink'}/>
                <h3>Web</h3>
              </div>
              <p>
                Tvoříme weby, které odpovídají vaší značce, cílové skupině i konkrétním cílům.
                Navrhujeme firemní prezentace, e‑shopy i komplexní webové aplikace s důrazem na přehlednost, rychlost a technickou kvalitu. Každý web ladíme tak, aby dobře fungoval na všech zařízeních, byl snadno dohledatelný ve vyhledávačích a dal se později rozvíjet podle vašich potřeb.             
              </p>
            </Card>  
            <Card delay={.3}>
              <div className={'flex gap-2 relative items-center'}>
                <Image alt="" src={'/images/icons/design.svg'} width={0} height={0} className={'!relative max-h-full w-auto flex-shrink'}/>
                <h3>Design</h3>
              </div>
              <p>
                Vytváříme vizuální identitu, která vaší značce dodá jasný směr, konzistenci a rozpoznatelnost.
                Design chápeme jako víc než jen estetiku – je to nástroj, který vám pomůže lépe komunikovat, budovat důvěru a posílit vztah se zákazníky. Každý návrh ladíme tak, aby dobře fungoval v praxi – na webu, v aplikaci i kdekoli na netu.
              </p>
            </Card>
            <Card delay={.6}>
              <div className={'flex gap-2 relative items-center'}>
                <Image alt="" src={'/images/icons/code.svg'} width={0} height={0} className={'!relative max-h-full w-auto flex-shrink'}/>
                <h3>Code</h3>
              </div>
              <p>
                Vyvíjíme aplikace a digitální nástroje na míru.
                Pracujeme s nejmodernějšími technologiemi a osvědčenými postupy, které zajišťují spolehlivost, bezpečnost i dlouhodobou udržitelnost. Realizujeme například rezervační systémy, interní portály, administrační rozhraní nebo aplikace pro sběr a správu dat – vždy přizpůsobené tomu, co skutečně potřebujete.
              </p>
            </Card>
        </div>
        <Btn href="/o-nas" className={'text-xl'}>Naše vize</Btn>
      </Section>
      <ProjectHM projects={lastProjects} />
    </main>
  </>
);
};
