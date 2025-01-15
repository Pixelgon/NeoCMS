import { FC } from "react";

interface InputProps {
   type: string;
   name: string;
   id: string;
   required: boolean;
   label: string;
   className?: string;
   placeholder?: string;
}

export const Input: FC<InputProps> = ({className, id, type, name, required, label, placeholder}) => {


      return (
         <div className={`flex flex-col ${className ? className : ''}`}>
               <label htmlFor={id} className={'text-wh font-quicksand text-lg pl-3 pb-1'}>{label}</label>
               <input type={type} name={name} id={id} required={required} placeholder={placeholder} className={'bg-sec p-3 !outline-none rounded-3xl text-wh font-quicksand text-lg relative z-20 w-full border border-prim transition-transform focus-within:scale-[1.01] focus-within:border-2 focus-within:bg-modal'}/>
         </div>
      );
   };
   export default Input;