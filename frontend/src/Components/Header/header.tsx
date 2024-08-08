import { FC } from "react";

interface HeaderProps {
    bg: string;
    children?: React.ReactNode;
}

export const Header: FC<HeaderProps> = ({bg,children}) => {
  return (
    <header className={'min-h-[40svh] bg-cover bg-fixed before:bg-header-gradient before:absolute flex flex-col justify-center items-center before:top-0 before:left-0 before:w-full before:h-full before:z-[0] relative'} style={{backgroundImage: `url(${bg})`}}>
        {children}
    </header>
  );
}