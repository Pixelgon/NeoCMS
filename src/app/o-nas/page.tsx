import { Header } from "@/components/header/Index";
import { Btn } from "@/components/layout/Btn";
import { ProfileLink, ProfileLinkType } from "@/components/layout/ProfileLink";
import { Section } from "@/components/layout/Section";
import { Metadata } from "next";
import Image from 'next/image';
import * as motion from "motion/react-client";
import { Card } from "@/components/layout/Card";

export const metadata: Metadata = {
  title: 'O nás | Pixelgon',
  description: 'Zjistěte více o našem týmu, naší vizi a hodnotách, které nás vedou k vytváření unikátních digitálních řešení.',
};

export default function ONas() {
  return (
      <>
      <Header bg="/images/headers/about-header.webp" title="O nás"/>
          <main>
              <Section isPrim>
               <motion.h2
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  Naše vize
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 w-full mt-5">
                  <Card sec>
                    <div className={'flex gap-2 relative items-center'}>
                      <Image alt="" src={'/images/icons/gear.svg'} width={0} height={0} className={'!relative max-h-full w-auto flex-shrink'}/>
                      <h3>Purpose</h3>
                    </div>
                    <p>
                      Tvoříme digitální řešení, která nejsou jen vizuálně atraktivní, ale hlavně plní svůj účel. Design, vývoj i obsah přizpůsobujeme tomu, co má ve výsledku opravdu fungovat – ne tomu, co jen dobře vypadá v prezentaci.
                    </p>
                  </Card>
                  <Card sec delay={.3}>
                    <div className={'flex gap-2 relative items-center'}>
                      <Image alt="" src={'/images/icons/sun.svg'} width={0} height={0} className={'!relative max-h-full w-auto flex-shrink'}/>
                      <h3>Clarity</h3>
                    </div>
                    <p>
                      Projekty stavíme tak, aby měly dlouhodobou hodnotu. Dáváme důraz na přehlednost, snadné používání a rozšiřitelnost – pro všechny, kdo s nimi pracují každý den, bez ohledu na technické znalosti.
                    </p>
                  </Card>
                  <Card sec delay={.6}>
                    <div className={'flex gap-2 relative items-center'}>
                      <Image alt="" src={'/images/icons/magn.svg'} width={0} height={0} className={'!relative max-h-full w-auto flex-shrink'}/>
                      <h3>Reason</h3>
                    </div>
                    <p>
                      Sledujeme moderní trendy, ale používáme je uvážlivě. Nesázíme na buzzwordy ani módní zkratky – zaměřujeme se na řešení, která dávají smysl, šetří čas a přinášejí skutečný přínos.
                    </p>
                  </Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 w-full items-center mt-5 justify-center">
                  <motion.div
                  initial={{opacity: 0, x: -200, filter: 'blur(5px)'}}
                  animate={{opacity: 1, x: 0, filter: 'blur(0px)'}} className={'rounded-3xl overflow-hidden relative'}>
                    <Image src={'/images/sections/profilovka.webp'} alt={'Matěj Matějka'} fill sizes="40vw" className={'col-span-5 !relative'}/>
                    <div className={'grid grid-cols-5 bg-pxlgn-gradient'}>
                      <ProfileLink type={ProfileLinkType.Email} link={'mailto:pixelgon@pixelgon.cz'}/>
                      <ProfileLink type={ProfileLinkType.Linkedin} link={'https://www.linkedin.com/in/pixelgon/'}/> 
                      <ProfileLink type={ProfileLinkType.Github} link={'https://github.com/Pixelgon'}/>
                      <ProfileLink type={ProfileLinkType.Discord} link={'https://discordapp.com/users/397172105411559446'}/>
                      <ProfileLink type={ProfileLinkType.Instagram} link={'https://www.instagram.com/pxlgn/'}/>
                    </div>
                  </motion.div>
                  <motion.div
                  initial={{opacity: 0, x: 200, filter: 'blur(5px)'}}
                  animate={{opacity: 1, x: 0, filter: 'blur(0px)'}} className={'flex flex-col gap-4 lg:col-span-2 items-start'}>
                    <h3>Matěj Matějka</h3>
                    <p>
                      Zdravíčko! Jmenuji se Matěj Matějka – jsem full-stack vývojář a grafik, známý online pod přezdívkou <strong>Pixelgon</strong>.
                      <br />
                      Baví mě propojovat techniku s estetikou a tvořit digitální řešení, která dávají smysl a fungují v praxi. Momentálně stojím za celým projektem sám – od návrhu přes vývoj až po nasazení, takže mám pod kontrolou celý proces od začátku do konce.
                      <br />
                      Ve volném čase brázdím traily na kole, chodím po horách, učím se novým věcem v IT, kutím vlastní projekty – a když je čas, rád si i něco zahraju.
                    </p>
                  </motion.div>
                </div>
              </Section>
          </main>
      </>
  );
}