import { FC, PropsWithChildren } from "react";

interface SectionProps {
    isPrim?: boolean;
    children: React.ReactNode;
    className?: string;
}

export const Section: FC<SectionProps> = ({children, isPrim, className}) => { 
    return (
        <section className={`${isPrim ? "bg-bg" : "bg-sec-gradient"} ${className}`}>
            <div className="max-w-7xl mx-auto px-4 flex flex-col gap-5 py-20 justify-center items-center">
                {children}
            </div>
        </section>
    );
};