import { FC, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { Btn } from "./btn";
import { LayoutContext } from "@/context/layoutContext";

interface ModalProps { 
  modal: ModalType;
}

export const Modal: FC<ModalProps> = ({ modal }) => {
  const layoutData = useContext(LayoutContext);

  useEffect(() => { 
    layoutData.setScroll(false);
    
    return () => {
      layoutData.setScroll(true);
    };
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ,[]);

  const handleClose = (confirm: boolean) => {
    layoutData.closeDialog();
    if (confirm) {
      setTimeout(() => layoutData.closeModal(), 500);
    } 
  };

  const handleBackdropClick = () => {
    if (modal.asking) {
      layoutData.showDialog(
        <>
          <h4>Opravdu chcete zavřít okno?</h4>
          <div className={'flex flex-wrap gap-4 w-full'}>
            <Btn className={'flex-grow'} onClick={() => handleClose(true)}>Ano</Btn>
            <Btn prim className={'flex-grow'} onClick={() => handleClose(false)}>Ne</Btn>
          </div>
        </>
      );
    } else {
      layoutData.closeModal();
    }
  };

  return (
    <motion.div 
      className={`fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,.65)] z-[100] flex justify-center items-center backdrop-blur-sm p-reg 2xl:px`} 
      onClick={handleBackdropClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
    >
      <motion.div 
        className={'max-h-full bg-modal p-6 rounded-[3rem] flex w-full flex-col gap-1 items-start relative backdrop-blur-sm max-w-7xl'} 
        onClick={(e) => e.stopPropagation()}
        initial={{ y: -50, opacity: 0, scale: 0 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
      >
        <div className={'flex w-full gap-4 mb-4 items-start ' + (modal.title ? 'justify-between' : 'justify-end')}>
          {modal.title && (
            <h3>
              {modal.title}
            </h3>
          )}
          <motion.button 
            initial={{scale: .1}} 
            animate={{scale: 1}} 
            exit={{scale: 0}} 
            transition={{ease: "easeInOut", duration: .25}} 
            onClick={handleBackdropClick}
          >
            <Image src={'/images/icons/close.svg'} alt={'Zavřít okno'} width={24} height={24} className={'transition-all hover:brightness-50 select-none drag-none'} />
          </motion.button>
        </div>
        <div className={'overflow-auto w-full'}>
          {modal.children}
        </div>
      </motion.div>
    </motion.div>
  );
};