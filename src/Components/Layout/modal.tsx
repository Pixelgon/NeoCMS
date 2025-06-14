import { FC } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

interface ModalProps { 
  modalState: boolean;
  setModalState: (state: boolean) => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: FC<ModalProps> = ({ children, modalState, setModalState, title }) => {

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
            className={'max-w-5xl max-h-full bg-modal p-6 rounded-[3rem] flex w-full flex-col gap-1 items-start relative backdrop-blur-lg overflow-y-auto overflow-x-hidden'} 
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          >
            <div className={'flex w-full gap-4 mb-4 items-start ' + (title ? 'justify-between' : 'justify-end')}>
              {title && (
                <h3>
                  {title}
                </h3>
              )}
              <motion.button initial={{scale: .1}} animate={{scale: 1}} exit={{scale: 0}} transition={{ease: "easeInOut", duration: .25}} onClick={() => setModalState(false)} className={'text-center bg-pxlgn-gradient rounded-full before:transition-all before:duration-300 before:bg-sec before:absolute before:h-[calc(100%-2px)] before:w-[calc(100%-2px)] before:top-[1px] before:rounded-full before:left-[1px] hover:before:bg-transparent relative justify-self-end'}>
                <div className={'bg-pxlgn-gradient transition-all duration-300 text-transparent bg-clip-text p-4 z-10 relative hover:bg-none hover:text-sec hover:bg-clip-border stroke-prim hover:stroke-sec'}>
                  <svg viewBox="0 0 24 24" strokeWidth="1.5" width={24} height={24}><path d="M 19.5 4.5 L 4.5 19.5 M 4.5 4.501 L 19.5 19.5" className={'stroke-inherit transition-all duration-300'}></path></svg>
                </div>
              </motion.button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};