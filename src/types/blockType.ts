import type { HTMLMotionProps } from "motion/react";

export type BlockMotionProps = HTMLMotionProps<"div">;

export type BlockEditType = {
   id: string;
   className?: string;
   html?: string;
   lastModified?: Date;
   motionProps?: BlockMotionProps;
};
