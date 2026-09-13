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
   defaultValue?: string;
   uncontrolled?: boolean;
   autoFocus?: boolean;
   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
   accept?: string;
   limit?: number;
   minLength?: number;
   error?: string;
}

export const Input: FC<InputProps> = ({className, id, type, name, required, label, placeholder, value, defaultValue, uncontrolled, autoFocus, onChange, accept, limit, minLength, error}) => {

      const errorId = `${id}-error`;

      return (
         <div className={`flex flex-col ${className ? className : ''}`}>
            {label && <label htmlFor={id} className={'text-wh font-quicksand text-lg pl-3 pb-1'}>{label}</label>}
            <input
               type={type}
               autoComplete="off"
               name={name}
               id={id}
               required={required}
               placeholder={placeholder}
               accept={accept}
               onChange={onChange}
               maxLength={limit}
               minLength={minLength}
               aria-invalid={Boolean(error)}
               aria-describedby={error ? errorId : undefined}
               autoFocus={autoFocus}
               {...(uncontrolled
                  ? { defaultValue: defaultValue ?? value ?? "" }
                  : { value: value ?? "" }
               )}
               className={`bg-sec p-3 !outline-none rounded-3xl text-wh font-quicksand text-lg relative z-20 w-full border ${error ? "border-err" : "border-prim"} transition-colors focus-within:bg-modal`}
            />
            {error && (
               <span id={errorId} role="alert" className="pt-1 pl-3 text-sm text-err">
                  {error}
               </span>
            )}
         </div>
      );
   };
   export default Input;
