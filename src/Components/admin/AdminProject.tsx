import Image from "next/image";
import { FC } from "react";
import { EyeIcon, EyeSlashIcon, MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Btn } from "../layout/Btn";

export interface AdminProjectProps {
   name: string;
   slug: string
   image: string;
   visible: boolean;
   edit: () => void;
   onDelete: () => void;
   onToggleVisibility: () => void;
}

export const AdminProject: FC<AdminProjectProps> = ({name, edit, image, slug, onDelete, onToggleVisibility, visible}) => {

   return (
      <div className="relative group">
         <button onClick={edit} className={'relative w-full h-auto before:bg-project-gradient before:absolute before: flex flex-col justify-center items-center before:bottom-0 before:duration-300 before:left-0 before:w-full before:transition-all group-hover:before:bottom-[-100%] before:h-full before:z-10 overflow-hidden rounded-3xl'}>
            <Image src={image} alt={name} fill sizes="40vw" className={'aspect-[3/2] object-cover h-auto !relative transition-transform duration-300 group-hover:scale-110'}/>
            <h3 className={'absolute bottom-0 left-0 p-4 z-20 text-start transition-transform duration-300 group-hover:translate-y-full'}>{name}</h3>
         </button>
         
         <div className="absolute top-2 right-2 z-30 flex gap-2">
            <Btn 
               href={`/projekty/${slug}`}
               target="_blank"
               prim
            >
               <MagnifyingGlassIcon className={'w-4 h-4'}/>
            </Btn>
               <Btn
                  onClick={() => onDelete()}
                  prim
               >
                 <TrashIcon className={'w-4 h-4'}/>
               </Btn>
               <Btn
                  onClick={() => onToggleVisibility()}
                  prim
               >
                  {visible ? <EyeIcon className={'w-4 h-4'}/> : <EyeSlashIcon className={'w-4 h-4'}/>}
               </Btn>
         </div>
      </div>
   );
}