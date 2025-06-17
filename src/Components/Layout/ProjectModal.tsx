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
   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProject((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleRichTextChange = (content: string) => {
      setProject((prev) => ({
         ...prev,
         body: content,
      }));
   };

   const handleChangeImage = (file: File | null) => {
      setProject((prev) => ({
         ...prev,
         photo: file ? URL.createObjectURL(file) : "",
      }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if(project.id) {
         const response = await fetch(`/api/projects/${project.id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               ...project,
               tags: tags.map(tag => tag.name),
            }),
         });
         if (response.ok) {
            const updatedProject = await response.json();
            setProject(updatedProject);
            setModalState(false);
         } else {
            const error = await response.json();
            console.error("Error updating project:", error);
         }
      } else {
         const response = await fetch('/api/projects', { 
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               ...project,
               tags: tags.map(tag => tag.name),
            }),
         });
         if (response.ok) {
            const newProject = await response.json();
            setProject(newProject);
            setModalState(false);
         } else {
            const error = await response.json();
            console.error("Error creating project:", error);
         }
      }
   };

   return (
      <Modal modalState={modalState} setModalState={setModalState} title={project.id != "" ? `Upravuješ ${project.name}` : "Vytvořit nový projekt"} asking>
         <form className="flex flex-col gap-2 w-full justify-center" onSubmit={(e) => handleSubmit(e)}>
            <Input type="text" placeholder="Název projekt" name="name" id="name" label="Jméno*" value={project?.name || ""} onChange={handleInputChange} required />
            <Input type="text" placeholder="Slug" name="slug" id="slug" label="Slug*" value={project?.slug || ""} onChange={handleInputChange} required />
            <ImageUpload name="bg" id="bg" label="Pozadí*" value={project?.background || ""} onChange={handleChangeImage} required />
            <ImageUpload name="photo" id="photo" label="Fotka*" value={project?.photo || ""} onChange={handleChangeImage} required />
            <RichText content={project?.body || ""} onChange={handleRichTextChange} />
            <TagInput tags={tags} setTags={setTags} />
            <Btn prim type="submit" className="btn btn-primary mt-5">Uložit</Btn>
         </form>
      </Modal>
   );
};