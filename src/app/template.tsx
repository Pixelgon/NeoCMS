"use client";

import { motion } from "motion/react";


export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: .1}}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}