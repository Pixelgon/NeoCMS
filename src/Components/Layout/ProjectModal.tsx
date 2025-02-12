import { FC, ChangeEvent, useState } from "react";
import Input from "./Input";
import { Modal } from "./Modal";
import { Btn } from "./Btn";
import ImageUpload from "./ImageUpload";
import TagInput from "./TagInput";
import ProjectType from "@/types/ProjectType";
import { TagType } from "@/types/TagType";
import RichText from "./RichText";



interface ProjectModalProps {
   project: ProjectType
   setProject: (project: ProjectType | ((prev: ProjectType) => ProjectType)) => void;
   modalState: boolean;
   setModalState: (state: boolean) => void;
}

export const ProjectModal: FC<ProjectModalProps> = ({ project, setProject, modalState, setModalState }) => {
   const [tags, setTags] = useState<TagType[]>(project?.tags || []);
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProject((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleChangeImage = (file: File | null) => {
      setProject((prev) => ({
         ...prev,
         photo: file ? URL.createObjectURL(file) : "",
      }));
   };

   return (
      <Modal modalState={modalState} setModalState={setModalState}>
         <h3>{project ? `Upravuješ ${project.name}` : "Vytvořit nový projekt"}</h3>
         <form className="flex flex-col gap-2 w-full justify-center" onSubmit={(e) => { e.preventDefault(); }}>
            <Input type="text" placeholder="Název projekt" name="name" id="name" label="Jméno*" value={project?.name || ""} onChange={handleChange} required />
            <Input type="text" placeholder="Slug" name="slug" id="slug" label="Slug*" value={project?.slug || ""} onChange={handleChange} required />
            <ImageUpload name="bg" id="bg" label="Pozadí*" value={project?.background || ""} onChange={handleChangeImage} required />
            <ImageUpload name="photo" id="photo" label="Fotka*" value={project?.photo || ""} onChange={handleChangeImage} required />
            <RichText content={project?.body || ""}/>
            <TagInput tags={tags} setTags={setTags} />
            <Btn prim type="submit" className="btn btn-primary mt-2">Uložit</Btn>
         </form>
      </Modal>
   );
};