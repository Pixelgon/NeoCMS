import { FC } from "react";

interface RichTextTabProps {
   onClick: () => void;
   isActive?: boolean;
   children: React.ReactNode;
   className?: string;
}

const RichTextTab: FC<RichTextTabProps> = ({ onClick, isActive, children, className }) => {
   return (
      <button 
         type="button" 
         onClick={onClick} 
         className={`p-2 text-base ${isActive ? "bg-prim text-sec" : ""} ${className ?? ""}`}
      >
         {children}
      </button>
   );
}

export default RichTextTab;