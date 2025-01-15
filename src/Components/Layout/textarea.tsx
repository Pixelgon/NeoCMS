import { FC } from "react";

interface TextareaProps {
   name: string;
   id: string;
   required: boolean;
   label: string;
   className?: string;
   placeholder?: string;
}

export const Textarea: FC<TextareaProps> = ({className, id, name, required, label, placeholder}) => {

   return (
      <div className={`flex flex-col ${className ? className : ''}`}>
            <label htmlFor={id} className={'text-wh font-quicksand text-lg pl-3 pb-1'}>{label}</label>
            <textarea name={name} id={id} required={required} placeholder={placeholder} className={'bg-sec p-3 rounded-3xl !outline-none text-wh font-quicksand text-lg relative z-20 w-full border border-prim min-w-full min-h-[104px] max-h-[min(200px,20vh)] resize-y rounded-br-none transition-transform focus-within:scale-[1.01] focus-within:border-2 focus-within:bg-modal'}/>
      </div>
   )
}

export default Textarea;