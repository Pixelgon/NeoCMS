import { FC, use, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { LayoutContext } from "@/context/LayoutContext";
import { Btn } from "./Btn";

interface ModalProps { 
  modalState: boolean;
  setModalState: (state: boolean) => void;
  children: React.ReactNode;
  title?: string;
  asking?: boolean;
}

export const Modal: FC<ModalProps> = ({ children, modalState, setModalState, title, asking }) => {
  const layoutData = useContext(LayoutContext);
  const [confirmation, setConfirm ] = useState(false);

  useEffect(() => { 
    layoutData.toggleScroll();
  }
  , [modalState]);

  const handleClose = (confirmation: boolean) => {
    setConfirm(false);
    if (confirmation) {
     setTimeout(() => setModalState(false), 500);
    } 
  };

  const handleBackdropClick = () => {
    if (confirmation) return;
      asking ? setConfirm(true) : setModalState(false);
  };

  return (
    <AnimatePresence>
      {modalState && (
        <motion.div 
          className={`fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,.65)] z-[100] flex justify-center items-center backdrop-blur-sm p-reg 2xl:px`} 
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          key='modal-backdrop'
        >
          <AnimatePresence>
          {(confirmation && asking) &&
          <motion.div 
            initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            key='modal-confirmation'
            className={'absolute top-1/2 left-1/2 flex flex-1 p-6 flex-col items-center justify-center gap-4 text-center text-wh bg-modal backdrop-blur-lg rounded-[3rem] w-fit z-50 drop-shadow-xl'}>
            <h4>Opravdu chcete zavřít okno?</h4>
            <div className={'flex flex-wrap gap-4 w-full'}>
              <Btn className={'flex-grow'} onClick={() => handleClose(true)}>Ano</Btn>
              <Btn prim className={'flex-grow'} onClick={() => handleClose(false)}>Ne</Btn>
            </div>
          </motion.div>
          }
          </AnimatePresence>
          <motion.div 
            className={'max-w-5xl max-h-full bg-modal p-6 rounded-[3rem] flex w-full flex-col gap-1 items-start relative backdrop-blur-lg'} 
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -50, opacity: 0, scale: 0 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            key='modal-content'
          >
            <div className={'flex w-full gap-4 mb-4 items-start ' + (title ? 'justify-between' : 'justify-end')}>
              {title && (
                <h3>
                  {title}
                </h3>
              )}
              <motion.button initial={{scale: .1}} animate={{scale: 1}} exit={{scale: 0}} transition={{ease: "easeInOut", duration: .25}} onClick={handleBackdropClick} key='modal-close-button'
                className={'text-center bg-pxlgn-gradient rounded-full before:transition-all before:duration-300 before:bg-sec before:absolute before:h-[calc(100%-2px)] before:w-[calc(100%-2px)] before:top-[1px] before:rounded-full before:left-[1px] hover:before:bg-transparent relative justify-self-end'}>
                <div className={'bg-pxlgn-gradient transition-all duration-300 text-transparent bg-clip-text p-4 z-10 relative hover:bg-none hover:text-sec hover:bg-clip-border stroke-prim hover:stroke-sec'}>
                  <svg viewBox="0 0 24 24" strokeWidth="1.5" width={24} height={24}><path d="M 19.5 4.5 L 4.5 19.5 M 4.5 4.501 L 19.5 19.5" className={'stroke-inherit transition-all duration-300'}></path></svg>
                </div>
              </motion.button>
            </div>
            <div className={'overflow-auto w-full'}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};