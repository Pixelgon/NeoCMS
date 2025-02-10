import { Project } from "@prisma/client";
import { FC } from "react";
import Input from "./input";
import { Modal } from "./modal";

interface ProjectModalProps {
   project: Project | null;
   setProject: (project: Project) => void;
   modalState: boolean;
   setModalState: (state: boolean) => void;
}

export const ProjectModal: FC<ProjectModalProps> = ({project, setProject, modalState, setModalState}) => {
   return (
      <Modal modalState={modalState} setModalState={setModalState}>
         <Input label="Název" value={project?.title} id=""/>

      </Modal>
   )
}