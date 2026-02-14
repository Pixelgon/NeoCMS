import { FC } from "react";
import { motion } from "motion/react";

interface AdminLinkProps {
   onClick?: () => void;
   className?: string;
   children?: React.ReactNode;
}

export const AdminLink: FC<AdminLinkProps> = ({ onClick, className, children }) => {
   return (
      <motion.button
         onClick={onClick}
         className={`uppercase text-base font-quicksand font-medium text-wh ${className} flex items-center gap-1  ${!onClick ? "cursor-default" : "hover:text-prim transition-colors"}`}
         initial={{ opacity: 0, scale: .9 }}
         animate={{ opacity: 1, scale: 1 }}
         exit={{ opacity: 0, scale: .9 }}
         transition={{ duration: .3 }}
      >
         {children}
      </motion.button>
   );
}
