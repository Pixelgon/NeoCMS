import { motion } from "motion/react";
import { FC } from "react";
import { Btn } from "./btn";
import { DialogType } from "@/types/dialogType";


interface DialogProps {
  dialog: DialogType;
}

export const Dialog: FC<DialogProps> = ({ dialog }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
      animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
      exit={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      key="dialog"
      className={
        "fixed top-1/2 left-1/2 flex flex-1 p-6 flex-col items-center justify-center gap-4 text-center text-wh bg-modal backdrop-blur-md rounded-[3rem] w-fit z-[1001] drop-shadow-xl"
      }
    >
      {dialog.upperPart}
      <div className="flex flex-wrap gap-4 w-full">
        <Btn className={'flex-grow'} prim onClick={dialog.btnR.onClick} disabled={dialog.btnR.disabled}>{dialog.btnR.text}</Btn>
        <Btn className={'flex-grow'} onClick={dialog.btnL.onClick} disabled={dialog.btnL.disabled}>{dialog.btnL.text}</Btn>
      </div>
    </motion.div>
  );
};
