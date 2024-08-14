'use client';
import { LayoutContextType } from "@/types/LayoutContextType";
import { MotionConfig } from "framer-motion";
import { createContext, FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";


const LayoutInit: LayoutContextType = {
    pages: [
        { name: "Domů", href: "/" },
        { name: "O nás", href: "/onas" },
        { name: "Projekty", href: "/projekty" },
        { name: "Grafika", href: "/grafika" },
    ],
    Scroll: true,
    setScroll: (value: boolean) => {},
};

export const LayoutContext = createContext<LayoutContextType>({...LayoutInit});

export const LayoutProvider: FC<PropsWithChildren> = ({ children }) => {
    const [Scroll, setScroll] = useState(true);
    const body = useRef(document.body);

    useEffect(() => {
        body.current.style.overflow = Scroll ? 'auto' : 'hidden';
    }, [Scroll]);

    return (
        <LayoutContext.Provider value={{...LayoutInit, Scroll, setScroll}}>
            <MotionConfig transition={{duration: .3}}>
            <body>
                {children}    
            </body>    
            </MotionConfig>
        </LayoutContext.Provider>
    );
}