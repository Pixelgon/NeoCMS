import Link from "next/link";
import { FC, ReactNode } from "react";

export interface btnProps {
    children: ReactNode;
    prim?: boolean;
    onClick?: () => void;
    href?: string;
    className?: string;
    target?: string;
    type?: "button" | "submit" | "reset";
}

interface btnStyles { 
    innerStyles: string;
    outerStyles: string;
}

const styles: btnStyles = {
    innerStyles: 'w-full sm:w-auto text-center bg-pxlgn-gradient rounded-3xl relative before:transition-all before:duration-300 before:bg-sec before:absolute before:h-[calc(100%-2px)] before:w-[calc(100%-2px)] before:top-[1px] before:rounded-3xl before:left-[1px] hover:before:bg-transparent',
    outerStyles: 'bg-pxlgn-gradient transition-all duration-300 text-transparent bg-clip-text px-8 py-4 z-10 relative hover:bg-none hover:text-sec hover:bg-clip-border'
};

const stylesPrim: btnStyles = {
    innerStyles: 'w-full sm:w-auto text-center bg-pxlgn-gradient rounded-3xl relative transition-all duration-300 hover:brightness-50 text-sec px-8 py-4',
    outerStyles: ''
};
export const Btn: FC<btnProps> = ({children, prim, onClick, href, className, target, type}) => {

    if(href) {
        return (
            <Link href={href} className={`${prim ? stylesPrim.innerStyles : styles.innerStyles} ${className}`} target={target}>
                {prim ? <>{children}</> : <div className={styles.outerStyles}>{children}</div>}
            </Link>
        );
    }
    else if(onClick || type)
    {
        return (
            <button onClick={onClick} type={type} className={`${prim ? stylesPrim.innerStyles : styles.innerStyles} ${className}`}>
                {prim ? <>{children}</> : <div className={styles.outerStyles}>{children}</div>}
            </button>
        );
    }
}