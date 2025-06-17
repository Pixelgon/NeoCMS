import { FC } from "react";

interface RichTextTabProps {
   onClick: () => void;
   isActive?: boolean;
   children: React.ReactNode;
}

const RichTextTab: FC<RichTextTabProps> = ({ onClick, isActive, children }) => {
   return (
      <button onClick={onClick} className={`p-2 ${isActive ? "bg-sec text-white" : ""}`}>{children}</button>
   );
}

export default RichTextTab;