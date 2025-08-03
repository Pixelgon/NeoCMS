import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export interface ProjectProps {
   name: string;
   slug: string
   photo: string;
}

export const Project: FC<ProjectProps> = ({ name, slug, photo }) => {
   return (
      <motion.article
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            layout
      >
         <Link href={`/projekty/${slug}`} className="group relative w-full h-auto before:bg-project-gradient before:absolute before: flex flex-col justify-center items-center before:bottom-0 before:duration-300 before:left-0 before:w-full before:transition-all hover:before:bottom-[-100%] before:h-full before:z-10 overflow-hidden rounded-3xl">
               <Image src={photo} alt={name} fill sizes="40vw" className={'aspect-[3/2] object-cover h-auto !relative transition-transform duration-300 group-hover:scale-110'}/>
               <h3 className={'absolute bottom-0 left-0 p-4 z-20 text-start transition-transform duration-300 group-hover:translate-y-full'}>{name}</h3>
         </Link>
      </motion.article>
   );
};

export default Project;
