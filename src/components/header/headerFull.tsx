'use client';
import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import WAVES from 'vanta/dist/vanta.waves.min.js';
import * as THREE from 'three';

export const HeaderFull: FC<PropsWithChildren> = ({children}) => {
  const [vantaEffect, setVantaEffect] = useState<any>(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        WAVES({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x151c24,
          waveHeight: 40.0,
          zoom: 0.8,
        })
      );
    }
    // Cleanup effect
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <>
      <header ref={vantaRef} className={'h-svh flex justify-center items-center before:bg-header-gradient before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-[1]'}>
            {children}
      </header>
    </>
  );
};