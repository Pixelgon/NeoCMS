import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { Tag } from "@prisma/client";
import { TagBtn } from "./TagBtn";
import { Btn } from "../layout/Btn";

interface TagFilterProps {
   availableTags: Tag[];
   selectedTags: string[];
   handleTagToggle: (tagId: string) => void;
   clearFilters: () => void;
}

export const TagFilter: FC<TagFilterProps> = ({ availableTags, selectedTags, handleTagToggle, clearFilters }) => {
   return (
      <div className="flex flex-wrap gap-4">
         {availableTags.map(tag => (
            <TagBtn
               key={tag.id}
               tag={tag}
               handleTagToggle={handleTagToggle}
               isSelected={selectedTags.includes(tag.id)}
            />
         ))}
         
         <AnimatePresence>
            {selectedTags.length > 0 && (
               <motion.div
                  key="clear-button"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  layout
               >
                  <Btn
                        onClick={clearFilters}
                        className="!w-auto"
                        prim
                  >
                     Vyčistit filtry
                  </Btn>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   )
}