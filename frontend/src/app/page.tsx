'use client';
// @ts-ignore
import * as THREE from "three";
// @ts-ignore
import WAVES from "vanta/src/vanta.waves"
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";


const StyledHeader = styled.header` 
    height: 100;
`;


export default function Home() {
const [vantaEffect, setVantaEffect] = useState(0);
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
    };
  }, [vantaEffect]);
  return (
      <>
          <StyledHeader>
                <div ref={vantaRef}>
                </div>
          </StyledHeader>
          <main>

          </main>
      </>

  );
};
