'use client';
import { FC, useState, ChangeEvent, useEffect, useRef } from "react";
import Image from "next/image";
import { useTopLoader } from "nextjs-toploader";
import { useLayout } from "@/context/layoutContext";

interface ImageUploadProps {
   id: string;
   name: string;
   label: string;
   required?: boolean;
   className?: string;
   value?: string;
   onChange: (url: string) => void;
}

export const ImageUpload: FC<ImageUploadProps> = ({ id, name, label, required, className, value, onChange }) => {
   const [photoPreview, setPhotoPreview] = useState<string>(value || "");
   const [error, setError] = useState<string>("");
   const inputRef = useRef<HTMLInputElement>(null);
   const loader = useTopLoader();
   const layoutData = useLayout();

   useEffect(() => {
      setPhotoPreview(value || "");
      // Resetovat file input když se value změní na prázdný string
      if (!value && inputRef.current) {
         inputRef.current.value = "";
      }
   }, [value]);

   // Cleanup URL objektů při unmount
   useEffect(() => {
      return () => {
         if (photoPreview && photoPreview.startsWith("blob:")) {
            URL.revokeObjectURL(photoPreview);
         }
      };
   }, [photoPreview]);

   const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      
      if (!file) {
         setPhotoPreview("");
         if (required) setError("Obrázek je povinný.");
         onChange("");
         return;
      }

      loader.start();
      setError("");

      try {
         // odstraní předchozí obrázek ze serveru, pokud existuje a není to blob URL
         if (value && !value.startsWith("blob:")) {
            await fetch(value, { method: "DELETE" });
         }
         // Uvolní předchozí URL objekty pro předcházení memory leaks
         if (photoPreview && photoPreview.startsWith("blob:")) {
            URL.revokeObjectURL(photoPreview);
         }

         // Zobrazí preview okamžitě
         const previewUrl = URL.createObjectURL(file);
         setPhotoPreview(previewUrl);

         // Uploaduje soubor na server
         const formData = new FormData();
         formData.append("file", file);
         formData.append("path", "images");

         const response = await fetch("/api/uploads", {
            method: "POST",
            body: formData,
         });

         if (!response.ok) {
            throw new Error("Upload failed");
         }

         const data = await response.json();

         // Uvolní preview URL a nahradí serverovou URL
         URL.revokeObjectURL(previewUrl);
         setPhotoPreview(data.url);
         onChange(data.url);

         if (layoutData?.showToast) {
            layoutData.showToast({
               message: "Obrázek byl úspěšně nahrán",
               type: "success",
            });
         }
      } catch (error) {
         // V případě chyby zruší preview
         setPhotoPreview("");
         onChange("");
         setError("Chyba při nahrávání obrázku");
         
         if (layoutData?.showToast) {
            layoutData.showToast({
               message: "Chyba při nahrávání obrázku",
               type: "error",
            });
         }
      } finally {
         loader.done();
      }
   };

   return (
      <div className={`flex flex-col ${className || ""}`}>
         <label htmlFor={id} className={'text-wh font-quicksand text-lg pl-3 pb-1'}>{label}</label>

         {photoPreview && (
            <div className={'relative max-h-[400px] w-full aspect-[16/9] border border-prim rounded-3xl flex items-center justify-center overflow-hidden'}>
               <Image src={photoPreview} alt="Nahraný obrázek" className={'w-full h-full object-contain'} width={400} height={400} />
            </div>
         )}

         <input ref={inputRef} type="file" id={id} name={name} accept="image/*" onChange={handleFileChange} className={`text-wh text-base file:border-none file:text-sec file:bg-pxlgn-gradient file:p-2 file:mr-2 file:rounded-3xl ${photoPreview ? 'my-2' : ''}`} />

         {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
   );
};

export default ImageUpload;