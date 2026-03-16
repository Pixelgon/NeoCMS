"use client";

import { FC, useMemo } from "react";
import { BlockEditType } from "@/types/blockType";
import { useBlock } from "@/context/blockContext";
import RichText from "@/components/form/richText";
import { AnimatePresence, motion } from "motion/react";
import { stripTrailingEmptyParagraphs } from "@/lib/blockHtml";


export const BlockEditable: FC<BlockEditType> = ({
  id,
  html,
  className,
  motionProps,
}) => {
  const block = useBlock();

  const { selectedBlockId, openEdit, modifyBlock, getEffectiveHtml, saveBlock, resetBlock } = block;

  const isSelected = selectedBlockId === id;
  
  const isDirty = useMemo(() => {
    return block.isDirty(id);
  }, [block, id]);

  const effectiveHtml = useMemo(
    () => getEffectiveHtml(id, html || ""),
    [getEffectiveHtml, id, html],
  );

  const renderedHtml = useMemo(
    () => stripTrailingEmptyParagraphs(effectiveHtml),
    [effectiveHtml],
  );

  const motionClassName = motionProps?.className ?? "";
  const mergedClassName = `${className ?? ""} ${motionClassName}`.trim();
  const motionStyle = motionProps?.style;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isSelected ? (
        <motion.div
          {...motionProps}
          key={`edit-${id}`}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-full min-w-0 ${mergedClassName}`.trim()}
          style={{ originY: 0, ...motionStyle }}
          initial={motionProps?.initial ?? { opacity: 0, filter: "blur(2px)" }}
          animate={motionProps?.animate ?? { opacity: 1, filter: "blur(0px)" }}
          exit={motionProps?.exit ?? { opacity: 0, filter: "blur(2px)" }}
          transition={motionProps?.transition ?? { duration: 0.3, ease: "easeInOut" }}
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
            animateToolbar
          />
        </motion.div>
      ) : (
        <motion.div
          {...motionProps}
          key={`read-${id}`}
          className={`flex w-full max-w-full min-w-0 flex-col gap-4 cursor-text overflow-hidden border ${isDirty ? "border-err" : "border-prim"} p-3 rounded-3xl ${mergedClassName} break-words [&_*]:max-w-full [&_*]:break-words [&_img]:h-auto [&_img]:max-w-full`.trim()}
          dangerouslySetInnerHTML={{ __html: renderedHtml }}
          onClick={() => openEdit(id)}
          style={{ originY: 0, ...motionStyle }}
          initial={motionProps?.initial ?? { opacity: 0, scaleY: 0.98, filter: "blur(2px)" }}
          animate={motionProps?.animate ?? { opacity: 1, scaleY: 1, filter: "blur(0px)" }}
          exit={motionProps?.exit ?? { opacity: 0, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, overflow: "hidden", filter: "blur(2px)" }}
          transition={motionProps?.transition ?? { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        />
      )}
    </AnimatePresence>
  );
};
