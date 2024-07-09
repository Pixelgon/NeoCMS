'use client';
import { HeaderFull } from "@/Components/Header/headerFull";
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
        <p className={'text-wh text-[4vw] -mt-4 font-quicksand font-normal'}>Your <strong className={'inline-block bg-pxlgn-gradient text-transparent bg-clip-text font-normal'}>vision</strong>, our <strong className={'inline-block bg-pxlgn-gradient text-transparent bg-clip-text font-normal'}>code</strong></p>
      </div>
    </HeaderFull>
  </>
);
};
