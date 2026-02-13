import { FC } from "react";
import { motion } from "framer-motion";

interface AdminLinkProps {
   onClick: () => void;
   className?: string;
   children?: React.ReactNode;
}

export const AdminLink: FC<AdminLinkProps> = ({ onClick, className, children }) => {
   return (
      <motion.button
         onClick={onClick}
         className={`uppercase text-base transition-colors font-quicksand font-medium duration-300 hover:brightness-50 text-wh ${className} flex items-center gap-1`}
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         exit={{ opacity: 0, scale: 0.9 }}
         transition={{ duration: 0.2 }}
         layout
      >
         {children}
      </motion.button>
   );
}
