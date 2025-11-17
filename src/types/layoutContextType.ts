type LayoutContextType = {
  Scroll: boolean;
  setScroll: (scroll: boolean) => void;
  showToast: (toast: ToastType) => void;
  showDialog: (children: React.ReactNode) => void;
  closeDialog: () => void;
  showModal: (modal: ModalType) => void;
  closeModal: () => void;
};