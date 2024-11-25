'use client';
import { LayoutContextType } from "@/types/LayoutContextType";
import { MotionConfig } from "motion/react";
import { createContext, FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";


const LayoutInit: LayoutContextType = {
    pages: [
        { name: "Domů", href: "/" },
        { name: "O nás", href: "/o-nas" },
        { name: "Projekty", href: "/projekty" },
    ],
    Scroll: true,
    setScroll: (value: boolean) => {},
};

export const LayoutContext = createContext<LayoutContextType>({...LayoutInit});

export const LayoutProvider: FC<PropsWithChildren> = ({ children }) => {
    const [Scroll, setScroll] = useState(true);
    const body = useRef<HTMLBodyElement>(null);

    useEffect(() => {
        document.body.style.overflow = Scroll ? 'auto' : 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [Scroll]);

    return (
        <LayoutContext.Provider value={{...LayoutInit, Scroll, setScroll}}>
            <MotionConfig transition={{duration: .5}}>
                {children}    
            </MotionConfig>
        </LayoutContext.Provider>
    );
}