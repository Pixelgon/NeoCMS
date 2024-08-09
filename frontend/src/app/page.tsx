'use client';
import { HeaderFull } from "@/Components/Header/headerFull";
import { Btn } from "@/Components/Layout/btn";
import { Section } from "@/Components/Layout/section";
import Image from 'next/image';
import Link from "next/link";
import { useRef } from "react";


export default function Home() {

return (
  <>  
    <HeaderFull>
      <Link href={'#intro'} className={'flex flex-col justify-center w-[75vw] max-w-[1000px] items-end select-none'}>
        <h1 className={'absolute left-[-10000px]'}>
          Pixelgon
        </h1>
        <p className={'absolute left-[-10000px]'}>Your vision, our code</p>
        <Image draggable="false" src="/logo/LogoText.svg" alt="Logo Pixelgon" fill className={'!relative'}/>
        <div className="w-[65.25%] relative ">
          <Image draggable="false" src="/logo/Slogan.svg" alt="Logo Pixelgon" fill className={'!relative mt-[1vw]'}/>
        </div>
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
    </main>
  </>
);
};
