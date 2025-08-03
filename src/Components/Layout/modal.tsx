import { FC, use, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { LayoutContext } from "@/context/LayoutContext";
import { Btn } from "./Btn";
import { Dialog } from "./Dialog";

interface ModalProps { 
  modalState: boolean;
  setModalState: (state: boolean) => void;
  children: React.ReactNode;
  title?: string;
  asking?: boolean;
}

export const Modal: FC<ModalProps> = ({ children, modalState, setModalState, title, asking }) => {
  const layoutData = useContext(LayoutContext);
  const [dialog, setDialog ] = useState(false);

  useEffect(() => { 
    layoutData.toggleScroll();
  }
  , [modalState, layoutData]);

  const handleClose = (dialog: boolean) => {
    setDialog(false);
    if (dialog) {
     setTimeout(() => setModalState(false), 500);
    } 
  };

  const handleBackdropClick = () => {
    if (dialog) return;
      asking ? setDialog(true) : setModalState(false);
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
          {(asking) &&
            <Dialog DialogState={dialog}>
              <h4>Opravdu chcete zavřít okno?</h4>
              <div className={'flex flex-wrap gap-4 w-full'}>
                <Btn className={'flex-grow'} onClick={() => handleClose(true)}>Ano</Btn>
                <Btn prim className={'flex-grow'} onClick={() => handleClose(false)}>Ne</Btn>
              </div>
            </Dialog>
          }
          <motion.div 
            className={'max-w-5xl max-h-full bg-modal p-6 rounded-[3rem] flex w-full flex-col gap-1 items-start relative backdrop-blur-sm'} 
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
              <motion.button initial={{scale: .1}} animate={{scale: 1}} exit={{scale: 0}} transition={{ease: "easeInOut", duration: .25}} onClick={handleBackdropClick} key='modal-close-button'>
                <Image src={'/images/icons/close.svg'} alt={'Zavřít okno'} width={24} height={24} className={'transition-all hover:brightness-50 select-none drag-none'} />
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