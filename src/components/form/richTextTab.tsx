import { FC } from "react";

interface RichTextTabProps {
   onClick: () => void;
   isActive?: boolean;
   children: React.ReactNode;
}

const RichTextTab: FC<RichTextTabProps> = ({ onClick, isActive, children }) => {
   return (
      <button 
         type="button" 
         onClick={onClick} 
         className={`p-2 text-base ${isActive ? "bg-prim text-sec" : ""}`}
      >
         {children}
      </button>
   );
}

export default RichTextTab;