import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Btn } from "./Btn";

export interface AdminProjectProps {
   name: string;
   slug: string
   image: string;
   edit: () => void;
   onDelete?: () => void;
}

export const AdminProject: FC<AdminProjectProps> = ({name, edit, image, slug, onDelete}) => {
   
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
               <Image src={'/images/icons/magnSolid.svg'} alt={'View'} width={16} height={16} className={'w-4 h-4'}/>
            </Btn>
            {onDelete && (
               <Btn
                  onClick={() => onDelete()}
                  prim
               >
                  <Image src={'/images/icons/binSolid.svg'} alt={'Delete'} width={16} height={16} className={'w-4 h-4'}/>
               </Btn>
            )}
         </div>
      </div>
   );
}