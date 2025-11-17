import { motion } from "motion/react";
import { FC } from "react";
import Image from "next/image";

interface toastProps {
  setToast: (toast: ToastType | null) => void;
  toast: ToastType | null;
}

export const Toast: FC<toastProps> = ({ setToast, toast }) => {
  return (
    <motion.div
      key="toast"
      initial={{ opacity: 0, y: 40, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: 20, x: "-50%" }}
      onClick={() => setToast(null)}
      transition={{ ease: "easeInOut", duration: 0.3, delay: 0.5 }}
      className={`fixed bottom-16 left-1/2 p-4 rounded-3xl backdrop-blur-md shadow-md z-[1000] text-wh flex items-center cursor-pointer bg-modal`}
    >
      <Image
        src={`/images/icons/${
          toast?.type === "success" ? "check" : "error"
        }.svg`}
        alt=""
        width={28}
        height={28}
        className="mr-2"
      />
      <div
        className={`${
          toast?.type == "success" ? "bg-pxlgn-gradient" : "bg-err-gradient"
        }  text-transparent bg-clip-text text-xl font-quicksand uppercase select-none break-all`}
      >
        {toast?.message}
      </div>
    </motion.div>
  );
};  
