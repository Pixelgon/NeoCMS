import { FC, PropsWithChildren } from "react";

interface SectionProps {
    isPrim?: boolean;
    children: React.ReactNode;
    className?: string;
}

export const Section: FC<SectionProps> = ({children, isPrim, className}) => { 
    return (
        <section className={`${isPrim ? "bg-bg" : "bg-sec-gradient"} ${className}`}>
            <div className={`max-w-7xl mx-auto px-reg 2xl:px flex flex-col gap-7 items-start ${!isPrim ? 'py-14 md:py-28' : 'py-10 md:py-20'}`}>
                {children}
            </div>
        </section>
    );
};