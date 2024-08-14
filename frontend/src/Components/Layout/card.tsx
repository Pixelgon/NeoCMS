import { FC, PropsWithChildren } from "react";


export const Card: FC<PropsWithChildren> = ({children}) => {
    return(
        <article className={'flex flex-col gap-3 items-center bg-bg rounded-3xl p-12 relative'}>
            {children}
        </article>
    );
}