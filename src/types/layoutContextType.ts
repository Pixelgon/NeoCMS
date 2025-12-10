import { DialogType } from "./dialogType";

export type LayoutContextType = {
  setScroll: (scroll: boolean) => void;
  showToast: (toast: ToastType) => void;
  showDialog: (dialog: DialogType) => void;
  closeDialog: () => void;
  showModal: (modal: ModalType, key?: string) => void;
  closeModal: () => void;
  activeModalKey: string | null;
};