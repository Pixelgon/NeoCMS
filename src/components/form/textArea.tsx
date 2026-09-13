import { FC } from "react";

interface TextareaProps {
   name: string;
   id: string;
   required: boolean;
   label: string;
   className?: string;
   placeholder?: string;
   value?: string;
   limit?: number;
   minLength?: number;
   error?: string;
   onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea: FC<TextareaProps> = ({className, id, name, required, label, placeholder, value, limit, minLength, error, onChange}) => {

   const errorId = `${id}-error`;

   return (
      <div className={`flex flex-col ${className ? className : ''}`}>
            <label htmlFor={id} className={'text-wh font-quicksand text-lg pl-3 pb-1'}>{label}</label>
            <textarea value={value} onChange={onChange} name={name} id={id} required={required} minLength={minLength} maxLength={limit} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} placeholder={placeholder} className={`bg-sec p-3 rounded-3xl !outline-none text-wh font-quicksand text-lg relative z-20 w-full border ${error ? "border-err" : "border-prim"} min-w-full min-h-[104px] resize-y rounded-br-none transition-colors duration-300 focus-within:bg-modal`}/>
            {error && (
               <span id={errorId} role="alert" className="pt-1 pl-3 text-sm text-err">
                  {error}
               </span>
            )}
      </div>
   )
}

export default Textarea;
