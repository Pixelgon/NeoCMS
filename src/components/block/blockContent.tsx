"use client";

import { BlockEditable } from "./blockEditable";
import { stripTrailingEmptyParagraphs } from "@/lib/blockHtml";
import { motion } from "motion/react";
import type { BlockMotionProps } from "@/types/blockType";

type BlockContentProps = {
  id: string;
  html: string;
  className?: string;
  isEditable: boolean;
  lastModified?: Date;
  motionProps?: BlockMotionProps;
};

const baseReadClassName =
  "flex min-w-0 flex-col gap-4 break-words [&_*]:max-w-full [&_*]:break-words [&_img]:h-auto [&_img]:max-w-full";

export function BlockContent({
  id,
  html,
  className,
  isEditable,
  lastModified,
  motionProps,
}: BlockContentProps) {
  if (isEditable) {
    return (
      <BlockEditable
        id={id}
        className={className}
        html={html}
        lastModified={lastModified}
        motionProps={motionProps}
      />
    );
  }

  const renderedHtml = stripTrailingEmptyParagraphs(html);

  if (motionProps) {
    const { className: motionClassName, ...restMotionProps } = motionProps;

    return (
      <motion.div
        {...restMotionProps}
        className={`${baseReadClassName} ${className ?? ""} ${motionClassName ?? ""}`.trim()}
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    );
  }

  return (
    <div
      className={`${baseReadClassName} ${className ?? ""}`.trim()}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}
