import { Metadata } from "next";
import Image from 'next/image';
import * as motion from "motion/react-client";
import { Header } from "@/components/header";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/layout/card";
import { ProfileLink, ProfileLinkType } from "@/components/layout/profileLink";

const baseUrl = process.env.BASE_URL || "https://pixelgon.cz";

export const metadata: Metadata = {
  title: 'O nás | Pixelgon',
  description: 'Zjistěte více o nás, naší vizi a hodnotách, které nás vedou k tomu, co děláme.',
  openGraph: {
    title: 'O nás | Pixelgon',
    description: 'Zjistěte více o nás, naší vizi a hodnotách, které nás vedou k tomu, co děláme.',
    type: 'website',
    url: `${baseUrl}/o-nas`,
    images: [
      {
        url: '/images/og.webp',
        width: 1200,
        height: 630,
        alt: 'Pixelgon',
      },
    ],
  },
  keywords: ['O nás', 'Pixelgon', 'tým', 'vize', 'hodnoty', 'digitální řešení', 'web development'],
};

export default function ONas() {
  return (
      <>
      <Header bg="/images/headers/about-header.webp" title="O nás"/>
          <main>
              <Section isPrim>
               <motion.h2
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  Naše vize
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 w-full mt-5">
                  <Card sec>
                    <div className={'flex gap-2 relative items-center flex-wrap justify-center'}>
                      <Image alt="" src={'/images/icons/gear.svg'} width={0} height={0} className={'!relative max-h-full w-auto flex-shrink'}/>
                      <h3>Purpose</h3>
                    </div>
                    <p>
                      Tvoříme digitální řešení, která nejsou jen vizuálně atraktivní, ale hlavně plní svůj účel. Design, vývoj i obsah přizpůsobujeme tomu, co má ve výsledku opravdu fungovat – ne tomu, co jen dobře vypadá v prezentaci.
                    </p>
                  </Card>
                  <Card sec delay={.3}>
                    <div className={'flex gap-2 relative items-center flex-wrap justify-center'}>
                      <Image alt="" src={'/images/icons/sun.svg'} width={0} height={0} className={'!relative max-h-full w-auto flex-shrink'}/>
                      <h3>Clarity</h3>
                    </div>
                    <p>
                      Projekty stavíme tak, aby měly dlouhodobou hodnotu. Dáváme důraz na přehlednost, snadné používání a rozšiřitelnost – pro všechny, kdo s nimi pracují každý den, bez ohledu na technické znalosti.
                    </p>
                  </Card>
                  <Card sec delay={.6}>
                    <div className={'flex gap-2 relative items-center flex-wrap justify-center'}>
                      <Image alt="" src={'/images/icons/magn.svg'} width={0} height={0} className={'!relative max-h-full w-auto flex-shrink'}/>
                      <h3>Reason</h3>
                    </div>
                    <p>
                      Sledujeme moderní trendy, ale používáme je uvážlivě. Nehoníme buzzwordy – raději volíme technologie a přístupy, které řeší reálné problémy a šetří čas i prostředky.
                    </p>
                  </Card>
                  <motion.div
                    transition={{ delay: 0.9 }}
                    initial={{opacity: 0, x: -200, filter: 'blur(5px)'}}
                    animate={{opacity: 1, x: 0, filter: 'blur(0px)'}} className={'rounded-3xl overflow-hidden relative flex flex-col'}>
                      <Image src={'/images/sections/profilovka.webp'} alt={'Matěj Matějka'} fill sizes="40vw" className={'!relative !h-auto flex-1 object-cover'}/>
                      <div className={'grid grid-cols-5 bg-pxlgn-gradient'}>
                        <ProfileLink type={ProfileLinkType.Email} link={'mailto:pixelgon@pixelgon.cz'}/>
                        <ProfileLink type={ProfileLinkType.Linkedin} link={'https://www.linkedin.com/in/pixelgon/'}/> 
                        <ProfileLink type={ProfileLinkType.Github} link={'https://github.com/Pixelgon'}/>
                        <ProfileLink type={ProfileLinkType.Discord} link={'https://discordapp.com/users/397172105411559446'}/>
                        <ProfileLink type={ProfileLinkType.Instagram} link={'https://www.instagram.com/pxlgn/'}/>
                      </div>
                  </motion.div>
                  <Card sec delay={1.2} className={'sm:col-span-2 justify-center !items-start'}>
                    <h3>Matěj Matějka</h3>
                    <p>
                      Zdravím! Jmenuji se Matěj Matějka – jsem full-stack vývojář a grafik, známý online pod přezdívkou <strong>Pixelgon</strong>.
                      <br />
                      Baví mě propojovat techniku s estetikou a tvořit digitální řešení, která dávají smysl a fungují v praxi. Momentálně stojím za celým projektem sám – od návrhu přes vývoj až po nasazení, takže mám pod kontrolou celý proces od začátku do konce.
                      <br />
                      Ve volném čase brázdím traily na kole, chodím po horách, učím se novým věcem v IT, kutím vlastní projekty – a když je čas, rád si i něco zahraju.
                    </p>
                  </Card>
                </div>
              </Section>
          </main>
      </>
  );
}