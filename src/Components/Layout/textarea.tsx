import { FC } from "react";

interface TextareaProps {
   name: string;
   id: string;
   required: boolean;
   label: string;
   className?: string;
   placeholder?: string;
   value?: string;
   onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea: FC<TextareaProps> = ({className, id, name, required, label, placeholder, value, onChange}) => {

   return (
      <div className={`flex flex-col ${className ? className : ''}`}>
            <label htmlFor={id} className={'text-wh font-quicksand text-lg pl-3 pb-1'}>{label}</label>
            <textarea value={value} onChange={onChange} name={name} id={id} required={required} placeholder={placeholder} className={'bg-sec p-3 rounded-3xl !outline-none text-wh font-quicksand text-lg relative z-20 w-full border border-prim min-w-full min-h-[104px] resize-y rounded-br-none transition-transform focus-within:bg-modal'}/>
      </div>
   )
}

export default Textarea;