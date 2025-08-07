import { FC, useState, ChangeEvent } from "react";
import Image from "next/image";

interface ImageUploadProps {
   id: string;
   name: string;
   label: string;
   required?: boolean;
   className?: string;
   value?: string; // URL obrázku z databáze
   onChange: (file: File | null) => void;
}

export const ImageUpload: FC<ImageUploadProps> = ({ id, name, label, required, className, value, onChange }) => {
   const [photoPreview, setPhotoPreview] = useState<string>(value || "");
   const [error, setError] = useState<string>("");

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setPhotoPreview(URL.createObjectURL(file));
         setError("");
         onChange(file);
      } else {
         setPhotoPreview("");
         if (required) setError("Obrázek je povinný.");
         onChange(null);
      }
   };

   return (
      <div className={`flex flex-col ${className || ""}`}>
         <label htmlFor={id} className={'text-wh font-quicksand text-lg pl-3 pb-1'}>{label}</label>

         {photoPreview && (
            <div className={'relative w-full h-[400px] border border-prim rounded-3xl flex items-center justify-center overflow-hidden'}>
               <Image src={photoPreview} alt="Nahraný obrázek" className={'w-full h-full object-contain'} width={400} height={400}/>
            </div>
         )}

         <input type="file" id={id} name={name} accept="image/*" onChange={handleFileChange} className={`text-wh text-base file:border-none file:text-sec file:bg-pxlgn-gradient file:p-2 file:mr-2 file:rounded-3xl ${photoPreview ? 'my-2' : ''}`} />

         {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
   );
};

export default ImageUpload;