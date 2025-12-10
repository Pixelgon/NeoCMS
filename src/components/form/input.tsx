import { FC, ChangeEvent } from "react";

interface InputProps {
   type: string;
   name: string;
   id: string;
   required?: boolean;
   label?: string;
   className?: string;
   placeholder?: string;
   value?: string;
   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
   accept?: string;
   limit?: number; // Optional, if you want to limit the input length
}

export const Input: FC<InputProps> = ({className, id, type, name, required, label, placeholder, value, onChange, accept, limit}) => {


      return (
         <div className={`flex flex-col ${className ? className : ''}`}>
            {label && <label htmlFor={id} className={'text-wh font-quicksand text-lg pl-3 pb-1'}>{label}</label>}
            <input type={type} autoComplete="off" name={name} id={id} required={required} placeholder={placeholder} value={value ?? ''} accept={accept} onChange={onChange} maxLength={limit} className={'bg-sec p-3 !outline-none rounded-3xl text-wh font-quicksand text-lg relative z-20 w-full border border-prim transition-transform focus-within:bg-modal'}/>
         </div>
      );
   };
   export default Input;