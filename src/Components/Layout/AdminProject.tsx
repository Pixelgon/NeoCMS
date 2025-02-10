import Image from "next/image";
import { FC } from "react";

export interface AdminProjectProps {
   name: string;
   image: string;
   edit: () => void;
}

export const AdminProject: FC<AdminProjectProps> = ({name, edit, image}) => {
   
   return (
      <button onClick={edit} className={'relative w-full h-auto before:bg-project-gradient before:absolute flex flex-col justify-center items-center before:top-0 before:left-0 before:w-full before:h-full before:z-10 group overflow-hidden rounded-3xl'}>
         <Image src={image} alt={name} fill sizes="40vw" className={'aspect-[3/2] object-cover h-auto !relative transition-transform duration-300 group-hover:scale-110'}/>
         <h3 className={'absolute bottom-0 left-0 p-2 z-20 text-start'}>{name}</h3>
      </button>
   );
}