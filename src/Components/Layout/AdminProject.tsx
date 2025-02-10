import Image from "next/image";
import { title } from "process";
import { FC } from "react";

export interface AdminProjectProps {
   title: string;
   image: string;
   edit: () => void;
}

export const AdminProject: FC<AdminProjectProps> = ({title, edit, image}) => {
   
   return (
      <button onClick={edit} className={'relative w-full h-auto before:bg-header-gradient before:absolute flex flex-col justify-center items-center before:top-0 before:left-0 before:w-full before:h-full before:z-10 transition hover:scale-110'}>
         <Image src={image} alt={title} fill sizes="40vw" className={'aspect-[3/2] rounded-3xl object-cover h-auto !relative'}/>
         <h3 className={'absolute bottom-0 left-0 p-2 z-20 text-start'}>{title}</h3>
      </button>
   );
}