import * as React from 'react';
import { FC } from 'react';
import Image from 'next/image';

interface LogoProps {
    full?: boolean;
    width: number;
    height: number;
}


export const Logo: FC<LogoProps> = ({ full = false, width, height}) => {
    if (full) {
        return (
            <>
                <Image
                    src="/logo/LogoText.svg"
                    alt="Logo Pixelgon"
                    width={width}
                    height={height}
                />
            </>
        );
    } else {
        return (
            <>
                <Image
                    src="/logo/Logo.svg"
                    alt="Logo Pixelgon"
                    width={width}
                    height={height}
                />
            </>
        );
    }
};

export default Logo;