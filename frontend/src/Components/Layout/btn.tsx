import Link from "next/link";
import { FC, ReactNode } from "react";

export interface btnProps {
    children: ReactNode;
    prim?: boolean;
    onClick?: () => void;
    href?: string;
    className?: string;
}

export const Btn: FC<btnProps> = ({children, prim, onClick, href, className}) => {
    if(href) {
        return (
            <Link href={href} className={`bg-pxlgn-gradient rounded-3xl relative before:transition-all before:duration-300 before:bg-bg-sec before:absolute before:h-[calc(100%-2px)] before:w-[calc(100%-2px)] before:top-[1px] before:rounded-3xl before:left-[1px] hover:before:bg-transparent ${className}`}>
                <div className={'bg-pxlgn-gradient transition-all duration-300 text-transparent bg-clip-text uppercase px-6 py-3 z-10 relative hover:bg-none hover:text-bg-sec hover:bg-clip-border'}>
                    {children}
                </div>
            </Link>
        );
    }
    else if(onClick)
    {
        return (
            <button onClick={onClick} className={`bg-pxlgn-gradient rounded-3xl ${className}`}>
                {children}
            </button>
        );
    }
}