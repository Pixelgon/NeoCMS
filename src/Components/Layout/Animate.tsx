'use client'

import { motion } from "motion/react"
import { FC } from "react"


interface AnimateProps {
   children?: React.ReactNode;
   initial?: object;
   animate?: object;
   transition?: object;
   whileInView?: object;
   viewport?: object;
   exit?: object;
   className?: string;
}

export const Animate: FC<AnimateProps> = ({ children, initial, animate, transition, whileInView, viewport, exit, className}) => {
   return (
      <motion.div
      initial={{ ...initial }}
      animate={{ ...animate }}
      transition={{ ...transition }} 
      whileInView={{ ...whileInView }}
      viewport={{ ...viewport }}
      exit={{ ...exit }}
      className={className}
      >
         {children}
      </motion.div>
   )
}