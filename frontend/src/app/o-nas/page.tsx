import { Header } from "@/components/Header/index"
import { ProfileLink, ProfileLinkType } from "@/components/Layout/profileLink";
import { Section } from "@/components/Layout/section";
import Image from 'next/image';


export default function ONas() {
  return (
      <>
      <Header bg="/images/headers/about-header.webp" title="O nás"/>
          <main>
              <Section isPrim>
                <h2>Naše vize</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias necessitatibus alias consequuntur saepe dignissimos eaque ipsum sapiente inventore? Commodi, non quos. Ea ut eum voluptate, pariatur error cumque fuga in. </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 w-full items-center mt-5">
                  <div className={'grid grid-cols-5 rounded-3xl overflow-hidden relative bg-pxlgn-gradient'}>
                    <Image src={'/images/sections/profilovka.webp'} alt={'Matěj Matějka'} fill sizes="40vw" className={'col-span-5 !relative'}/>
                    <ProfileLink type={ProfileLinkType.email} link={'mailto:pixelgon@pixelgon.cz'}/>
                    <ProfileLink type={ProfileLinkType.linkedin} link={'https://www.linkedin.com/in/pixelgon/'}/> 
                    <ProfileLink type={ProfileLinkType.github} link={'https://github.com/Pixelgon'}/>
                    <ProfileLink type={ProfileLinkType.discord} link={'https://discordapp.com/users/397172105411559446'}/>
                    <ProfileLink type={ProfileLinkType.instagram} link={'https://www.instagram.com/pxlgn/'}/>
                  </div>
                  <div className={'flex flex-col gap-4 col-span-2'}>
                    <h3>Matěj Matějka</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, quidem. Quisquam, voluptate. Quisquam, voluptate.</p>
                  </div>
                </div>
              </Section>
          </main>
      </>
  );
}