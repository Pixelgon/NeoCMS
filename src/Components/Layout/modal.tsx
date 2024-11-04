import { FC } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
          className={`fixed top-0 left-0 w-full h-full bg-bg-sec bg-opacity-50 z-[100] flex justify-center items-center backdrop-blur-sm p-4`} 
          onClick={() => setModalState(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <motion.div 
            className={'max-w-4xl bg-navbar p-8 rounded-3xl mx-auto flex w-full flex-col gap-5 items-start relative backdrop-blur-lg'} 
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          >
            <button onClick={() => setModalState(false)} className={'absolute top-4 right-4 transition-all duration-300 hover:opacity-75'}>
              <Image src={'/images/icons/close.svg'} alt={'Zavřít'} width={30} height={30}/>
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};