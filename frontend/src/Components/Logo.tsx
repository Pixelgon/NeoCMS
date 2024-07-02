import * as React from 'react';
import {FC} from 'react';
import Image from "next/image";
import styled from "styled-components";


interface LogoProps {
    full?: number;
}

const StyledImg = styled(Image)`
    display: block;
`;

export const Logo: FC<LogoProps> = ({full = 0}) => {
  if (full) {
      return (
          <>
            <StyledImg src="/logo/LogoText.svg" alt="Logo Pixelgon" objectFit="contain" height={9} width={61}/>
          </>
          );
  }
  else {
        return (
            <>
                <StyledImg src="/logo/Logo.svg" alt="Logo Pixelgon" height={24} width={24}/>
            </>
        );
    }
}

export default Logo;