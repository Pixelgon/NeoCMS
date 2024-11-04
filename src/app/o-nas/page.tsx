'use client'
import { Header } from "@/components/Header/index"
import { Btn } from "@/components/Layout/btn";
import { ProfileLink, ProfileLinkType } from "@/components/Layout/profileLink";
import { Section } from "@/components/Layout/section";
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from "next/link";


export default function ONas() {
  return (
      <>
      <Header bg="/images/headers/about-header.webp" title="O nás"/>
          <main>
              <Section isPrim>
                <motion.h2 
                initial={{opacity: 0, scale: 0}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{ once: true }}>Naše vize</motion.h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias necessitatibus alias consequuntur saepe dignissimos eaque ipsum sapiente inventore? Commodi, non quos. Ea ut eum voluptate, pariatur error cumque fuga in. </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 w-full items-center mt-5 justify-center">
                  <motion.div 
                  initial={{opacity: 0, x: -200, filter: 'blur(5px)'}}
                  animate={{opacity: 1, x: 0, filter: 'blur(0px)'}} className={'rounded-3xl overflow-hidden relative'}>
                    <Image src={'/images/sections/profilovka.webp'} alt={'Matěj Matějka'} fill sizes="40vw" className={'col-span-5 !relative'}/>
                    <div className={'grid grid-cols-5 bg-pxlgn-gradient'}>
                      <ProfileLink type={ProfileLinkType.email} link={'mailto:pixelgon@pixelgon.cz'}/>
                      <ProfileLink type={ProfileLinkType.linkedin} link={'https://www.linkedin.com/in/pixelgon/'}/> 
                      <ProfileLink type={ProfileLinkType.github} link={'https://github.com/Pixelgon'}/>
                      <ProfileLink type={ProfileLinkType.discord} link={'https://discordapp.com/users/397172105411559446'}/>
                      <ProfileLink type={ProfileLinkType.instagram} link={'https://www.instagram.com/pxlgn/'}/>
                    </div>
                    </motion.div>
                  <motion.div 
                  initial={{opacity: 0, x: 200, filter: 'blur(5px)'}}
                  animate={{opacity: 1, x: 0, filter: 'blur(0px)'}} className={'flex flex-col gap-4 lg:col-span-2 items-start'}>
                    <h3>Matěj Matějka</h3>
                    <p>Zdravím!
                        Jmenuji se Matěj Matějka a
                        jsem full-stack vývojář a grafik
                        známý na internetu pod
                        přezdívkou Pixelgon. Ve
                        volném čase jezdím s rodinou
                        a přáteli na horském kole,
                        chodím na výlety, rád se učím
                        novým věcem v IT, pracuji na
                        svých projektech a
                        samozřejmě hraji počítačové
                        hry.
                      </p>
                    <Btn href={'/MMatejkaCV.pdf'} target="_blank">Stáhnout CV</Btn>
                  </motion.div>
                </div>
              </Section>
          </main>
      </>
  );
}