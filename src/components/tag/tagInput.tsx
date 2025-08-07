import { FC, useState, useEffect } from "react";
import { Tag } from "../../../generated/prisma_client";

interface TagInputProps {
   tags: Tag[];
   setTags: (tags: Tag[]) => void;
   label?: string;
}

export const TagInput: FC<TagInputProps> = ({ tags, setTags, label = "Tagy" }) => {
   const [allTags, setAllTags] = useState<Tag[]>([]);

   // Načtení všech dostupných tagů
   useEffect(() => {
      const fetchTags = async () => {
         try {
            const res = await fetch("/api/tags");
            const data = await res.json();
            setAllTags(data);
         } catch (err) {
            console.error("Chyba při načítání tagů:", err);
         }
      };

      fetchTags();
   }, []);

   const toggleTag = (tag: Tag) => {
      const exists = tags.find((t) => t.id === tag.id);
      if (exists) {
         setTags(tags.filter((t) => t.id !== tag.id));
      } else {
         setTags([...tags, tag]);
      }
   };

   return (
      <div className="flex flex-col">
         <span className="text-wh font-quicksand text-lg pl-3 pb-1">{label}</span>
         <div className="flex flex-wrap gap-2 p-2 min-h-12 border border-prim rounded-3xl bg-sec">
            {allTags.map((tag) => {
               const isSelected = tags.some((t) => t.id === tag.id);
               return (
                  <button
                     key={tag.id}
                     type="button"
                     onClick={() => toggleTag(tag)}
                     className={`px-3 py-1 rounded-full text-sm transition-all hover:opacity-75 ${
                        isSelected
                           ? "bg-pxlgn-gradient text-sec"
                           : "bg-bg text-wh"
                     }`}
                  >
                     {tag.name}
                  </button>
               );
            })}
         </div>
         {tags.length === 0 && (
            <span className="text-gray-400 mt-2">Vyber aspoň jeden tag.</span>
         )}
      </div>
   );
};

export default TagInput;