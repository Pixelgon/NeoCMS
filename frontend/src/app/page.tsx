'use client';
import { HeaderFull } from "@/Components/Header/headerFull";
import { Section } from "@/Components/Layout/section";
import Image from 'next/image';


export default function Home() {
return (
  <>  
    <HeaderFull>
      <div className={'flex flex-col justify-center w-[50vw] min-w-[300px] items-end select-none'}>
        <h1 className={'absolute left-[-10000px]'}>
          Pixelgon
        </h1>
        <Image draggable="false" src="/logo/LogoText.svg" alt="Logo Pixelgon" fill className={'!relative'}/>
        <p className={'text-wh text-[4vw] mt-2 font-quicksand font-normal'}>Your <strong className={'bg-pxlgn-gradient text-transparent bg-clip-text font-normal inline-block'}>vision</strong>, our <strong className={'bg-pxlgn-gradient text-transparent bg-clip-text font-normal inline-block'}>code</strong></p>
      </div>
    </HeaderFull>
    <main>
      <Section isPrim>
        <h2>
          Precizně napsaný web
        </h2>
        <p>
          V dnešní době je nezbytné mít pro úspěch digitální identitu, ale musíte se odlišit. Naší prioritou při tvorbě webových stránek je neotřelý funkční design, technické zpracování, efektivní SEO a samozřejmě individuální přístup ke každému projektu. Nevěříte?
        </p>
        
      </Section>
    </main>
  </>
);
};
