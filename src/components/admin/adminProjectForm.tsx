import { FC, ChangeEvent, useState, useEffect, useContext } from "react";
import Input from "../form/input";
import { Btn } from "../layout/btn";
import ImageUpload from "../form/imageUpload";
import TagInput from "../tag/tagInput";
import { useTopLoader } from "nextjs-toploader";
import { LayoutContext } from "@/context/layoutContext";
import RichText from "../form/richText";
import ProjectType from "@/types/projectType";


interface AdminProjectFormProps {
   project: ProjectType;
   onChange: (patch: Partial<ProjectType>) => void;
   onSaved: (project: ProjectType) => void;
}

export const AdminProjectForm: FC<AdminProjectFormProps> = ({ project, onChange, onSaved }) => {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const loader = useTopLoader();
   const layoutData = useContext(LayoutContext);


   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      
      if (name === 'name') {
         // Automaticky generuj slug z názvu (pouze pokud je slug prázdný nebo se rovná současnému slug)
         const currentSlug = project?.slug;
         const autoSlug = value.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Odstraní diakritiku
            .replace(/[^a-z0-9\s-]/g, '') // Odstraní nepovolené znaky
            .replace(/\s+/g, '-') // Nahradí mezery pomlčkami
            .replace(/-+/g, '-') // Sloučí více pomlček za sebou
            .replace(/^-+|-+$/g, ''); // Odstraní pomlčky ze začátku a konce
         
         const shouldAutoGenerateSlug = !currentSlug || currentSlug === project.name?.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
         
         const patch: Partial<ProjectType> = { name: value };
         if (shouldAutoGenerateSlug) {
            patch.slug = autoSlug;
         }
         onChange(patch);
      } else if (name === 'slug') {
         const slugValue = value.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Odstraní diakritiku
            .replace(/[^a-z0-9\s-]/g, '') // Odstraní nepovolené znaky
            .replace(/\s+/g, '-') // Nahradí mezery pomlčkami
            .replace(/-+/g, '-') // Sloučí více pomlček za sebou
            .replace(/^-+|-+$/g, ''); // Odstraní pomlčky ze začátku a konce
         
         onChange({ slug: slugValue });
      } else {
         onChange({ [name]: value } as Partial<ProjectType>);
      }
   };

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
             project.tags.length > 0;
   };

   // Tlačítko je disabled pokud projekt není kompletní nebo se submittuje
   const isSubmitDisabled = !isProjectComplete() || isSubmitting;

   const handleRichTextChange = (content: string) => {
      onChange({ body: content });
   };

   const handleChangeImage = async (file: File | null, fieldName: 'photo' | 'background') => {
      loader.start();
      if (!file) {
         onChange({ [fieldName]: "" });
         loader.done();
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
         onChange({ [fieldName]: previewUrl });

         // Uploaduje soubor na server
         const formData = new FormData();
         formData.append('file', file);

         const response = await fetch('/api/uploads', {
            method: 'POST',
            body: formData,
         });

         if (!response.ok) {
            throw new Error('Upload failed');
         }

         const data = await response.json();
         
         // Uvolní preview URL a nahradí serverovou URL
         URL.revokeObjectURL(previewUrl);
         onChange({ [fieldName]: data.url });

         if (layoutData?.showToast) {
            layoutData.showToast({
               message: "Obrázek byl úspěšně nahrán",
               type: "success"
            });
         }
      } catch (error) {
         // V případě chyby zruší preview
         onChange({ [fieldName]: "" });
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
      loader.start();

      try {
         const url = project.id ? `/api/projects/${project.id}` : '/api/projects';
         const method = project.id ? 'PUT' : 'POST';

         const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project),
         });

         if (response.ok) {
            const savedData = await response.json();
            
            layoutData.showToast({
               message: project.id ? 'Projekt byl aktualizován' : 'Projekt byl vytvořen',
               type: 'success',
            });

            onSaved(savedData);
         } else {
            const error = await response.json();
            layoutData.showToast({
               message: error.error || 'Chyba při ukládání projektu',
               type: 'error',
            });
         }
      } catch (error) {
         layoutData.showToast({
            message: 'Chyba při ukládání projektu',
            type: 'error',
         });
      } finally {
         setIsSubmitting(false);
         loader.done();
      }
   };

   return (
      <form className="flex flex-col gap-2 w-full justify-center" onSubmit={(e) => handleSubmit(e)}>
         <Input type="text" placeholder="Název projekt" name="name" id="name" label="Jméno*" value={project?.name || ""} onChange={handleInputChange} required />
         <Input type="text" placeholder="Slug" name="slug" id="slug" label="Slug*" value={project?.slug || ""} onChange={handleInputChange} required />
         <Input type="text" placeholder="Popis" name="description" id="description" label="Popis*" value={project?.description || ""} onChange={handleInputChange} required limit={155} />
         <ImageUpload name="bg" id="bg" label="Pozadí*" value={project?.background || ""} onChange={(file) => handleChangeImage(file, 'background')} required />
         <ImageUpload name="photo" id="photo" label="Titulní obrázek*" value={project?.photo || ""} onChange={(file) => handleChangeImage(file, 'photo')} required />
         <RichText content={project?.body || ""} onChange={handleRichTextChange} />
         <TagInput tags={project?.tags} setTags={(tags) => onChange({ tags })} />
         <Btn
            prim
            type="submit"
            disabled={isSubmitDisabled}
            className="mt-5"
         >
            {isSubmitting ? "Ukládám..." : (project.id ? "Uložit změny" : "Vytvořit projekt")}
         </Btn>
      </form>
   );
};