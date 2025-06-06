import { FC } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

interface ModalProps { 
  modalState: boolean;
  setModalState: (state: boolean) => void;
  children: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({ children, modalState, setModalState }) => {

  return (
    <AnimatePresence>
      {modalState && (
        <motion.div 
          className={`fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,.65)] z-[100] flex justify-center items-center backdrop-blur-sm px-reg 2xl:px`} 
          onClick={() => setModalState(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <motion.div 
          className={'max-w-4xl max-h-full bg-modal p-8 rounded-3xl mx-auto flex w-full flex-col gap-1 items-start relative backdrop-blur-lg overflow-y-auto overflow-x-hidden'} 
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          >
            {children}
          </motion.div>  
        </motion.div>
      )}
    </AnimatePresence>
  );
};