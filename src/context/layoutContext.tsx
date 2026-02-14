'use client';
import { AnimatePresence } from "motion/react";
import { FC, PropsWithChildren, useState, useEffect, useCallback, useMemo, createContext, useContext } from "react";
import { Toast } from "@/components/layout/toast";
import { Dialog } from "@/components/layout/dialog";
import { Modal } from "@/components/layout/modal";
import { LayoutContextType } from "@/types/layoutContextType";
import { DialogType } from "@/types/dialogType";


export const LayoutContext = createContext<LayoutContextType | null>(null);

export const LayoutProvider: FC<PropsWithChildren> = ({ children }) => {
  const [scroll, setScroll] = useState(true);
  const [toast, setToast] = useState<ToastType | null>(null);
  const [dialog, setDialogContent] = useState<DialogType | null>(null);
  const [modal, setModal] = useState<ModalType | null>(null);
  const [activeModalKey, setActiveModalKey] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", !scroll);
  }, [scroll]);

  const handleSetScroll = useCallback((scroll: boolean) => {
    setScroll(scroll);
  }, []);

  const showToast = useCallback((toast: ToastType) => {
    setToast(toast);
    setTimeout(() => setToast(null), 4000);
  }, []);

  const showDialog = useCallback((dialog: DialogType) => {
    setDialogContent(dialog);
  }, []);

  const closeDialog = useCallback(() => {
    setDialogContent(null);
  }, []);

  const showModal = useCallback((modalData: ModalType, key?: string) => {
    if (modal) {
      setModal(null);
      setActiveModalKey(null);
      setTimeout(() => {
        setModal(modalData);
        setActiveModalKey(key || null);
      }, 150);
    } else {
      setModal(modalData);
      setActiveModalKey(key || null);
    }
  }, [modal]);

  const closeModal = useCallback(() => {
    setModal(null);
    setActiveModalKey(null);
  }, []);

  const contextValue = useMemo(() => ({
    scroll,
    setScroll: handleSetScroll,
    showToast,
    showDialog,
    closeDialog,
    showModal,
    closeModal,
    activeModalKey
  }), [scroll, handleSetScroll, showToast, showDialog, closeDialog, showModal, closeModal, activeModalKey]);

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
      <AnimatePresence>
        {toast && (
          <Toast
            key="toast"
            setToast={setToast}
            toast={toast}
          />
        )}
        {dialog && (
          <Dialog key="dialog" dialog={dialog} />
        )}
        {modal && (
          <Modal
            key="modal"
            modal={modal}
          />
        )}
      </AnimatePresence>
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context =  useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}