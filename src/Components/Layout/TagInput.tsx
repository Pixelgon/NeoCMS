import { TagType } from "@/types/TagType";
import { FC, ChangeEvent, KeyboardEvent, useState } from "react";

interface TagInputProps {
   tags: TagType[];
   setTags: (tags: TagType[]) => void;
   label?: string;
   placeholder?: string;
}

export const TagInput: FC<TagInputProps> = ({ tags, setTags, label = "Tagy", placeholder = "Přidat tag a stisknout Enter" }) => {
   const [tagInput, setTagInput] = useState("");

   const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
      setTagInput(e.target.value);
   };

   const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && tagInput.trim() !== "") {
         e.preventDefault();
         const newTag: TagType = { name: tagInput.trim() };
         if (!tags.some(tag => tag.name === newTag.name)) {
            setTags([...tags, newTag]);
         }
         setTagInput("");
      }
   };

   const removeTag = (tagToRemove: string) => {
      setTags(tags.filter(tag => tag.name !== tagToRemove));
   };

   return (
      <div className="flex flex-col">
         <label className="text-wh font-quicksand text-lg pl-3 pb-1">{label}</label>
         <div className="flex flex-wrap gap-2 p-2 border border-prim rounded-lg bg-gray-800">
            {tags.map((tag, index) => (
               <span key={index} className="bg-gray-600 text-white px-2 py-1 rounded-lg flex items-center">
                  {tag.name}
                  <button type="button" onClick={() => removeTag(tag.name)} className={'ml-2 text-red-400 hover:text-red-600'}>×</button>
               </span>
            ))}
         </div>

         {/* Input pro přidání tagu */}
         <input 
            type="text" 
            placeholder={placeholder}
            value={tagInput}
            onChange={handleTagInput}
            onKeyDown={addTag}
            className={'bg-sec p-3 !outline-none rounded-3xl text-wh font-quicksand text-lg relative z-20 w-full border border-prim transition-transform focus-within:bg-modal mt-2'}
         />
      </div>
   );
};

export default TagInput;