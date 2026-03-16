import { Metadata } from "next";
import Image from 'next/image';
import * as motion from "@/lib/motion";
import Block from "@/components/block/block";
import { Header } from "@/components/header";
import BlockCard from "@/components/layout/blockCard";
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
               <motion.Block
                  id='intro_title'
                  motionProps={{
                    initial: {opacity: .1, scale: 0},
                    whileInView: {opacity: 1, scale: 1},
                    viewport: { once: true },
                  }}
                  />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 w-full mt-5">
                  <BlockCard id="purpose" iconPath="/images/icons/gear.svg" sec />
                  <BlockCard id="clarity" iconPath="/images/icons/sun.svg" sec delay={.3} />
                  <BlockCard id="reason" iconPath="/images/icons/magn.svg" sec delay={.6} />
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
                    <Block id="matej" />
                  </Card>
                </div>
              </Section>
          </main>
      </>
  );
}
