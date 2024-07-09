import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import WAVES from 'vanta/dist/vanta.waves.min';
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
      <header ref={vantaRef} className={'w-full h-svh flex justify-center items-center'}>
            {children}
      </header>
    </>
  );
};