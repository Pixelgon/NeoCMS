import { FC, PropsWithChildren } from "react";

interface SectionProps {
    isPrim?: boolean;
    children: React.ReactNode;
}

export const Section: FC<SectionProps> = ({children, isPrim}) => { 
    return (
        <section className={ isPrim ? "bg-prim-gradient" : "bg-sec-gradient"}>
            <div className="max-w-7xl mx-auto px-4 flex flex-col gap-5 py-16 justify-center items-center">
                {children}
            </div>
        </section>
    );
};