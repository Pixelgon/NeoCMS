import { FC, ChangeEvent, useState, useEffect, useContext, use } from "react";
import Input from "./Input";
import { Modal } from "./Modal";
import { Btn } from "./Btn";
import ImageUpload from "./ImageUpload";
import TagInput from "./TagInput";
import ProjectType from "@/types/ProjectType";
import { TagType } from "@/types/TagType";
import RichText from "./RichText";
import { useTopLoader } from "nextjs-toploader";
import { LayoutContext } from "@/context/LayoutContext";


interface ProjectModalProps {
   project: ProjectType
   setProject: (project: ProjectType | ((prev: ProjectType) => ProjectType)) => void;
   modalState: boolean;
   setModalState: (state: boolean) => void;
}


export const ProjectModal: FC<ProjectModalProps> = ({ project, setProject, modalState, setModalState }) => {
   const [tags, setTags] = useState<TagType[]>(project.tags || []);
   const [initialProject, setInitialProject] = useState<ProjectType>(project);
   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProject((prev) => ({
         ...prev,
         [name]: value,
      }));
   };
   const loader = useTopLoader();
   const layoutData = useContext(LayoutContext);

   useEffect(() => {
      if (project.tags) {
         setTags(project.tags);
      }
      setInitialProject(project);
   }, [project.tags]);

   // Kontrola, zda je projekt kompletní
   const isProjectComplete = () => {
      return project.name && 
             project.slug && 
             project.background && 
             project.photo && 
             project.body &&
             project.description;
   };

   // Kontrola, zda byl projekt upraven
   const isProjectModified = () => {
      const tagsChanged = JSON.stringify(tags.map(t => t.id).sort()) !== 
                          JSON.stringify((initialProject.tags || []).map(t => t.id).sort());
      
      return project.name !== initialProject.name ||
             project.slug !== initialProject.slug ||
             project.background !== initialProject.background ||
             project.photo !== initialProject.photo ||
             project.body !== initialProject.body ||
             project.description !== initialProject.description ||
             tagsChanged;
   };

   // Tlačítko je disabled pokud projekt není kompletní nebo (pokud existuje) nebyl upraven
   const isSubmitDisabled = !isProjectComplete() || (project.id && !isProjectModified());


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
      
      if (isSubmitDisabled) return;
      
      loader.start();
      if(project.id) {
         try {
            const response = await fetch(`/api/projects/${project.id}`, {
               method: 'PUT',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  ...project,
                  tags: tags.map(tag => tag.id),
               }),
            });
            if (response.ok) {
               const updatedProject = await response.json();
               setProject(updatedProject);
               setModalState(false);
               layoutData.showToast({ message: 'Projekt byl aktualizován', type: 'success' });
            } else {
               const error = await response.json();
               layoutData.showToast({ message: `Chyba při aktualizaci`, type: 'error' });
            }
         } catch (error) {
            layoutData.showToast({ message: 'Chyba při aktualizaci projektu', type: 'error' });
         }
         finally {
            loader.done();
         }
      } else {
         try {
            const response = await fetch('/api/projects', { 
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  ...project,
                  tags: tags.map(tag => tag.id),
               }),
            });
            if (response.ok) {
               const newProject = await response.json();
               setProject(newProject);
               setModalState(false);
               layoutData.showToast({ message: 'Projekt byl vytvořen', type: 'success' });
            } else {
               const error = await response.json();
               layoutData.showToast({ message: `Chyba při vytváření projektu`, type: 'error' });
            }
         }
         catch (error) {
            layoutData.showToast({ message: 'Chyba při vytváření projektu', type: 'error' });
         }
         finally {
            loader.done();
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
            <Btn 
               prim 
               type="submit" 
               disabled={!!isSubmitDisabled}
               className="mt-5"
            >
               {project.id ? "Uložit změny" : "Vytvořit projekt"}
            </Btn>
         </form>
      </Modal>
   );
};