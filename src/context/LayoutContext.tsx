'use client';
import { LayoutContextType } from "@/types/LayoutContextType";
import { createContext, FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";

const LayoutInit: LayoutContextType = {
    pages: [
        { name: "Domů", href: "/" },
        { name: "O nás", href: "/o-nas" },
        { name: "Projekty", href: "/projekty"},
    ],
    Scroll: true,
    toggleScroll: () => {},
};

export const LayoutContext = createContext<LayoutContextType>({...LayoutInit});

export const LayoutProvider: FC<PropsWithChildren> = ({ children }) => {
    const [Scroll, setScroll] = useState(true);

    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", !Scroll);
    }, [Scroll]);

    const toggleScroll = useCallback(() => {
        setScroll((prevScroll) => !prevScroll);
    }, []);

    const contextValue = useMemo(() => ({
        ...LayoutInit,
        Scroll,
        toggleScroll,
    }), [Scroll, toggleScroll]);

    return (
        <LayoutContext.Provider value={contextValue}>
            {children}
        </LayoutContext.Provider>
    );
};