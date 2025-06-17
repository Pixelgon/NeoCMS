import Image from 'next/image';
import { Btn } from '@/components/layout/Btn';
import { Card } from '@/components/layout/Card';
import { Section } from '@/components/layout/Section';
import { Metadata } from 'next';
import HeaderLogo from '@/components/header/HeaderLogo';
import * as motion from "motion/react-client";
 

export const metadata: Metadata = {
  title: 'Pixelgon - Your vision, our code',
  description: 'Tvoříme webové stránky, které nejsou jen vizuálně přívětivé, ale především efektivní a unikátní. Naším cílem je vytvořit plně funkční digitální identitu, která se odliší od konkurence. Postaráme se o celý proces – od originálního designu přes technické provedení až po optimalizaci pro vyhledávače. Ke každému projektu přistupujeme individuálně s důrazem pro detail, abyste uspěli v digitálním světě.',
}


export default function Home() {

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
              Tvoříme webové stránky, které nejsou jen vizuálně přívětivé, ale především efektivní a unikátní. Naším cílem je vytvořit plně funkční digitální identitu, která vás odliší od konkurence. Postaráme se o celý proces – od originálního designu přes technické provedení až po optimalizaci pro vyhledávače. Ke každému projektu přistupujeme individuálně s důrazem pro detail, tak abyste uspěli v digitálu.
            </p>
            <Btn href="/projekty" prim className={'text-xl'}>Přesvědčit se</Btn>  
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
              Naše tvorba webů je postavena na originálním designu, moderních technologiích a důrazu na uživatelskou přívětivost. Ať už jde o jednoduché stránky, e-shopy nebo složitější aplikace, naším cílem je vytvořit digitální prostředí, které přesně reflektuje potřeby a styl našich klientů. SEO a responzivita jsou samozřejmostí.</p>
            </Card>  
            <Card delay={.3}>
              <div className={'flex gap-2 relative items-center'}>
                <Image alt="" src={'/images/icons/design.svg'} width={0} height={0} className={'!relative max-h-full w-auto flex-shrink'}/>
                <h3>Design</h3>
              </div>
              <p>Náš design se zaměřuje nejen na estetickou stránku, ale také na posílení a zefektivnění vaší značky. Pomáháme vám vytvořit vizuální identitu, která je konzistentní, silná a snadno rozpoznatelná. Kombinujeme kreativitu s funkčností, abychom vám pomohli lépe komunikovat s vaším cílovou skupinou a dosáhnout lepšího výsledku na trhu.</p>
            </Card>
            <Card delay={.6}>
              <div className={'flex gap-2 relative items-center'}>
                <Image alt="" src={'/images/icons/code.svg'} width={0} height={0} className={'!relative max-h-full w-auto flex-shrink'}/>
                <h3>Code</h3>
              </div>
              <p>Specializujeme se na vývoj softwarových řešení, která jsou přesně přizpůsobena vašim potřebám. Naše aplikace jsou navrženy tak, aby byly spolehlivé, snadno použitelné a škálovatelné. Nezáleží na tom, jestli jde o jednoduchou aplikaci nebo komplexní systém – vždy klademe důraz na kvalitu, efektivitu a hladkou integraci do vašeho podnikání.</p>
            </Card>
        </div>
        <Btn href="/o-nas" className={'text-xl'}>Naše vize</Btn>
      </Section>
      <Section isPrim>
        <motion.h2 
        initial={{opacity: .1, scale: 0}}
        whileInView={{opacity: 1, scale: 1}}
        viewport={{ once: true }}>
          Poslední projekty
        </motion.h2>
      </Section>
    </main>
  </>
);
};
