import { FC } from "react";
import Input from "./input";
import { Modal } from "./modal";
import { Btn } from "./btn";
import Textarea from "./textarea";
import { Project } from "@prisma/client";

interface ProjectModalProps {
   project: Project | null;
   setProject: (project: Project) => void;
   modalState: boolean;
   setModalState: (state: boolean) => void;
}

export const ProjectModal: FC<ProjectModalProps> = ({project, setProject, modalState, setModalState}) => {
   return (
      <Modal modalState={modalState} setModalState={setModalState}>
         <h3>{project ? `Upravit ${project.name}` : "Vytvořit nový projekt"}</h3>
         <form className={'flex flex-col gap-2 w-full justify-center'}>
            <Input type="text" placeholder="Název projekt" name="name" id="name" label="Jméno*" value={project?.name ? project?.name : ""} required/>
         </form>
      </Modal>
   )
}