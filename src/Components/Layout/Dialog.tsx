import { AnimatePresence, motion } from "motion/react";
import { dialog } from "motion/react-client";
import { FC, PropsWithChildren } from "react";


interface DialogProps {
   children: React.ReactNode;
   DialogState?: boolean;
}


export const Dialog: FC<DialogProps> = ({ children, DialogState }) => {
   return (
      <AnimatePresence>
         {DialogState && (
            <motion.div 
               initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
               animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
               exit={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
               transition={{ ease: "easeInOut", duration: 0.5 }}
               key='modal-confirmation'
               className={'absolute top-1/2 left-1/2 flex flex-1 p-6 flex-col items-center justify-center gap-4 text-center text-wh bg-modal backdrop-blur-md rounded-[3rem] w-fit z-50 drop-shadow-xl'}>
               {children}
            </motion.div>
         )}
      </AnimatePresence>
   )
}