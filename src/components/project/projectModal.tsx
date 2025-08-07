import { FC, ChangeEvent, useState, useEffect, useContext, use } from "react";
import Input from "../form/input";
import { Modal } from "../layout/modal";
import { Btn } from "../layout/btn";
import ImageUpload from "../form/imageUpload";
import TagInput from "../tag/tagInput";
import { useTopLoader } from "nextjs-toploader";
import { LayoutContext } from "@/context/layoutContext";
import RichText from "../form/richText";
import ProjectType from "@/types/projectType";
import { Tag } from "@prisma/client";


interface ProjectModalProps {
   project: ProjectType
   setProject: (project: ProjectType | ((prev: ProjectType) => ProjectType)) => void;
   modalState: boolean;
   setModalState: (state: boolean) => void;
   onSubmit: (projectData: ProjectType, tags: any[]) => Promise<void>;
}


export const ProjectModal: FC<ProjectModalProps> = ({ project, setProject, modalState, setModalState, onSubmit }) => {
   const [tags, setTags] = useState<Tag[]>(project.tags || []);
   const [initialProject, setInitialProject] = useState<ProjectType>(project);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      
      if (name === 'name') {
         // Automaticky generuj slug z názvu (pouze pokud je slug prázdný nebo se rovná současnému slug)
         const currentSlug = project.slug;
         const autoSlug = value.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Odstraní diakritiku
            .replace(/[^a-z0-9\s-]/g, '') // Odstraní nepovolené znaky
            .replace(/\s+/g, '-') // Nahradí mezery pomlčkami
            .replace(/-+/g, '-') // Sloučí více pomlček za sebou
            .replace(/^-+|-+$/g, ''); // Odstraní pomlčky ze začátku a konce
         
         setProject((prev) => ({
            ...prev,
            [name]: value,
            slug: !currentSlug || currentSlug === prev.name?.toLowerCase()
               .normalize("NFD")
               .replace(/[\u0300-\u036f]/g, "")
               .replace(/[^a-z0-9\s-]/g, '')
               .replace(/\s+/g, '-')
               .replace(/-+/g, '-')
               .replace(/^-+|-+$/g, '') ? autoSlug : currentSlug,
         }));
      } else if (name === 'slug') {
         const slugValue = value.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Odstraní diakritiku
            .replace(/[^a-z0-9\s-]/g, '') // Odstraní nepovolené znaky
            .replace(/\s+/g, '-') // Nahradí mezery pomlčkami
            .replace(/-+/g, '-') // Sloučí více pomlček za sebou
            .replace(/^-+|-+$/g, ''); // Odstraní pomlčky ze začátku a konce
         
         setProject((prev) => ({
            ...prev,
            [name]: slugValue,
         }));
      } else {
         setProject((prev) => ({
            ...prev,
            [name]: value,
         }));
      }
   };
   const loader = useTopLoader();
   const layoutData = useContext(LayoutContext);

   useEffect(() => {
      if (project.tags) {
         setTags(project.tags);
      }
      setInitialProject(project);
   }, [project.tags, project]);

   // Cleanup URL objektů při unmount nebo změně
   useEffect(() => {
      return () => {
         if (project.photo && project.photo.startsWith('blob:')) {
            URL.revokeObjectURL(project.photo);
         }
         if (project.background && project.background.startsWith('blob:')) {
            URL.revokeObjectURL(project.background);
         }
      };
   }, [project.photo, project.background]);

   // Kontrola, zda je projekt kompletní
   const isProjectComplete = () => {
      return project.name && 
             project.slug && 
             project.background && 
             project.photo && 
             project.body &&
             project.description &&
             tags.length > 0;
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

   // Tlačítko je disabled pokud projekt není kompletní nebo (pokud existuje) nebyl upraven nebo se submittuje
   const isSubmitDisabled = !isProjectComplete() || (project.id && !isProjectModified()) || isSubmitting;

   const handleRichTextChange = (content: string) => {
      setProject((prev) => ({
         ...prev,
         body: content,
      }));
   };

   const handleChangeImage = async (file: File | null, fieldName: 'photo' | 'background') => {
      loader.start();
      if (!file) {
         setProject((prev) => ({
            ...prev,
            [fieldName]: "",
         }));
         return;
      }

      try {
         // Uvolní předchozí URL objekty pro předcházení memory leaks
         const currentValue = project[fieldName];
         if (currentValue && currentValue.startsWith('blob:')) {
            URL.revokeObjectURL(currentValue);
         }

         // Zobrazí preview okamžitě
         const previewUrl = URL.createObjectURL(file);
         setProject((prev) => ({
            ...prev,
            [fieldName]: previewUrl,
         }));

         // Uploaduje soubor na server
         const formData = new FormData();
         formData.append('file', file);

         const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
         });

         if (!response.ok) {
            throw new Error('Upload failed');
         }

         const data = await response.json();
         
         // Uvolní preview URL a nahradí serverovou URL
         URL.revokeObjectURL(previewUrl);
         setProject((prev) => ({
            ...prev,
            [fieldName]: data.url,
         }));

         if (layoutData?.showToast) {
            layoutData.showToast({
               message: "Obrázek byl úspěšně nahrán",
               type: "success"
            });
         }
      } catch (error) {
         // V případě chyby zruší preview
         setProject((prev) => ({
            ...prev,
            [fieldName]: "",
         }));
         if (layoutData?.showToast) {
            layoutData.showToast({
               message: "Chyba při nahrávání obrázku",
               type: "error"
            });
         }
      }
      loader.done();
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (isSubmitDisabled) return;
      
      setIsSubmitting(true);
      try {
         await onSubmit(project, tags);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <Modal modalState={modalState} setModalState={setModalState} title={project.id != "" ? `Upravuješ ${project.name}` : "Vytvořit nový projekt"} asking>
         <form className="flex flex-col gap-2 w-full justify-center" onSubmit={(e) => handleSubmit(e)}>
            <Input type="text" placeholder="Název projekt" name="name" id="name" label="Jméno*" value={project?.name || ""} onChange={handleInputChange} required />
            <Input type="text" placeholder="Slug" name="slug" id="slug" label="Slug*" value={project?.slug || ""} onChange={handleInputChange} required />
            <Input type="text" placeholder="Popis" name="description" id="description" label="Popis*" value={project?.description || ""} onChange={handleInputChange} required />
            <ImageUpload name="bg" id="bg" label="Pozadí*" value={project?.background || ""} onChange={(file) => handleChangeImage(file, 'background')} required />
            <ImageUpload name="photo" id="photo" label="Titulní obrázek*" value={project?.photo || ""} onChange={(file) => handleChangeImage(file, 'photo')} required />
            <RichText content={project?.body || ""} onChange={handleRichTextChange} />
            <TagInput tags={tags} setTags={setTags} />
            <Btn 
               prim 
               type="submit" 
               disabled={isSubmitDisabled}
               className="mt-5"
            >
               {isSubmitting ? "Ukládám..." : (project.id ? "Uložit změny" : "Vytvořit projekt")}
            </Btn>
         </form>
      </Modal>
   );
};