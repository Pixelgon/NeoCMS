import { FC } from "react";

interface AdminLinkProps {
   onClick: () => void;
   className?: string;
   title: string;
}

export const AdminLink: FC<AdminLinkProps> = ({ onClick, title, className }) => {
   return (
      <button onClick={onClick} className={`uppercase text-base transition-all font-quicksand font-medium duration-300 hover:brightness-50 text-wh ${className}`}>
         {title}
      </button>
   );
}
