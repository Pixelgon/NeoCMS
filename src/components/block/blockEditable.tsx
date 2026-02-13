"use client";

import { FC, useMemo } from "react";
import { BlockEditType } from "@/types/blockType";
import { useBlock } from "@/context/blockContext";
import RichText from "@/components/form/richText";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";


export const BlockEditable: FC<BlockEditType> = ({ id, html, className }) => {
  const block = useBlock();

  const { selectedBlockId, openEdit, modifyBlock, getEffectiveHtml, saveBlock, resetBlock } = block;

  const isSelected = selectedBlockId === id;
  
  const isDirty = useMemo(() => {
    return block.isDirty(id);
  }, [block, id]);

  // efektivní obsah = draft (pokud existuje) nebo original props
  const effectiveHtml = useMemo(
    () => getEffectiveHtml(id, html || ""),
    [getEffectiveHtml, id, html],
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isSelected ? (
        <motion.div
          key={`edit-${id}`}
          onClick={(e) => e.stopPropagation()}
          className={`w-full h-full ${className ?? ""}`}
          style={{ originY: 0 }}
          initial={{ opacity: 0, scale: .99, filter: "blur(2px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.99, filter: "blur(2px)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <RichText
            content={effectiveHtml}
            onChange={(newHtml) => modifyBlock(id, newHtml, html || "")}
            hideableToolbar={false}
            headingLevels={[1, 2, 3]}
            autoFocus
            isChanged={isDirty}
            saveBlock={() => saveBlock(id)}
            resetBlock={() => resetBlock(id)}
          />
        </motion.div>
      ) : (
        <motion.div
          key={`read-${id}`}
          className={`flex flex-col gap-4 cursor-text border ${isDirty ? "border-err" : "border-prim"} p-3 rounded-3xl ${className ?? ""}`}
          dangerouslySetInnerHTML={{ __html: effectiveHtml }}
          onClick={() => openEdit(id)}
          style={{ originY: 0 }}
          initial={{ opacity: 0, scaleY: 0.98, filter: "blur(2px)" }}
          animate={{ opacity: 1, scaleY: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scaleY: 0.98, filter: "blur(2px)" }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  );
};
