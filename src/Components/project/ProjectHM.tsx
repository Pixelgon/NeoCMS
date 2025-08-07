'use client';
import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import { Section } from "../layout/section";
import { motion } from "framer-motion";
import { Btn } from "../layout/btn";

type ProjectHMType = {
   name: string;
   slug: string
   photo: string;
   description: string;
}

export interface ProjectHMProps {
   projects: ProjectHMType[];
}

export const ProjectHM: FC<ProjectHMProps> = ({ projects }) => {
   return (
      <Section isPrim>
         {projects.map(({ name, slug, photo, description }, index) => {
            const isEven = index % 2 === 1; // druhý projekt (index 1) a každý sudý
            
            return (
               <motion.article 
                  key={slug} 
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-14 w-full items-center ${isEven ? 'lg:grid-flow-col-dense mt-8' : ''}`}
                  initial={{ opacity: 0, x: isEven ? 100 : -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.3, }}
               >
                  <Link 
                     href={`/projekty/${slug}`} 
                     className={`group relative w-full h-auto before:bg-project-gradient before:absolute before: flex flex-col justify-center items-center before:bottom-0 before:duration-300 before:left-0 before:w-full before:transition-all hover:before:bottom-[-100%] before:h-full before:z-10 overflow-hidden rounded-3xl ${isEven ? 'lg:col-start-2' : ''}`}
                  >
                     <Image src={photo} alt={name} fill sizes="40vw" className={'aspect-[3/2] object-cover h-auto !relative transition-transform duration-300 group-hover:scale-110'}/>
                  </Link>
                  <div className={`flex flex-col justify-center ${isEven ? 'lg:col-start-1 lg:items-end' : 'items-start'}`}>
                     <h2>{name}</h2>
                     <p className="mt-3 text-wh">{description}</p>
                     <Btn href={`/projekty/${slug}`} className="mt-6">
                        Zobrazit
                     </Btn>
                  </div>
               </motion.article>
            );
         })}
      </Section>
   );
}

export default ProjectHM;