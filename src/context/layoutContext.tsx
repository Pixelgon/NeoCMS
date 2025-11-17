'use client';
import { AnimatePresence } from "motion/react";
import { FC, PropsWithChildren, useState, useEffect, useCallback, useMemo, createContext } from "react";
import NextTopLoader from "nextjs-toploader";
import { Toast } from "@/components/layout/toast";
import { Dialog } from "@/components/layout/dialog";
import { Modal } from "@/components/layout/modal";


export const LayoutContext = createContext<LayoutContextType>({
  Scroll: true,
  setScroll: (scroll: boolean) => {},
  showToast: () => {},
  showDialog: () => {},
  closeDialog: () => {},
  showModal: () => {},
  closeModal: () => {}
});

export const LayoutProvider: FC<PropsWithChildren> = ({ children }) => {
  const [Scroll, setScroll] = useState(true);
  const [toast, setToast] = useState<ToastType | null>(null);
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(null);
  const [modal, setModal] = useState<ModalType | null>(null);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", !Scroll);
  }, [Scroll]);

  const handleSetScroll = useCallback((scroll: boolean) => {
    setScroll(scroll);
  }, []);

  const showToast = useCallback((toast: ToastType) => {
    setToast(toast);
    setTimeout(() => setToast(null), 4000);
  }, []);

  const showDialog = useCallback((children: React.ReactNode) => {
    setDialogContent(children);
  }, []);

  const closeDialog = useCallback(() => {
    setDialogContent(null);
  }, []);

  const showModal = useCallback((modal: ModalType) => {
    setModal(modal);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  const contextValue = useMemo(() => ({
    Scroll,
    setScroll: handleSetScroll,
    showToast,
    showDialog,
    closeDialog,
    showModal,
    closeModal
  }), [Scroll, handleSetScroll, showToast, showDialog, closeDialog, showModal, closeModal]);

  return (
    <LayoutContext.Provider value={contextValue}>
      <NextTopLoader
          color="linear-gradient(90deg, #00CCFF 0%, #1CD2E6 57%, #58DEB1 80%, #91E97E 100%)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={300}
          shadow={false}
      />
      {children}
      <AnimatePresence>
        {toast && (
          <Toast
            key="toast"
            setToast={setToast}
            toast={toast}
          />
        )}
        {dialogContent && (
          <Dialog key="dialog">
            {dialogContent}
          </Dialog>
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