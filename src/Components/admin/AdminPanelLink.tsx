import { FC } from "react";

interface AdminLinkProps {
   onClick: () => void;
   children: React.ReactNode;
   className?: string;
}

export const AdminLink: FC<AdminLinkProps> = ({ onClick, children, className }) => {
   return (
      <button onClick={onClick} className={`text-prim uppercase text-base transition-all font-quicksand font-medium duration-300 hover:brightness-50 ${className}`}>
         {children}
      </button>
   );
}
