import { FC } from "react";
import { Tag } from "@prisma/client";

interface TagBtnProps {
      tag: Tag;
      handleTagToggle: (tagId: string) => void;
      isSelected: boolean;
}


export const TagBtn:FC<TagBtnProps> = ({ tag, handleTagToggle, isSelected }) => {
   return (
      <button
            key={tag.id}
            onClick={() => handleTagToggle(tag.id)}
            className={`text-center bg-pxlgn-gradient rounded-full relative transition-all before:duration-300 before:bg-sec before:absolute before:h-[calc(100%-2px)] before:w-[calc(100%-2px)] before:top-[1px] before:rounded-full before:left-[1px] hover:before:bg-transparent 
               ${isSelected
                  ? 'before:bg-pxlgn-gradient hover:brightness-50'
                  : 'bg-sec text-wh hover:bg-prim hover:text-sec'
            }`}
      >
         <div className={`bg-pxlgn-gradient transition-all duration-300 bg-clip-text px-4 py-2 md:px-8 md:py-4 z-10 relative hover:bg-none hover:text-sec hover:bg-clip-border
            ${isSelected
                  ? 'bg-pxlgn-gradient text-sec' : 'text-transparent'
            }`}>
            {tag.name}
         </div>
      </button>
   )
}