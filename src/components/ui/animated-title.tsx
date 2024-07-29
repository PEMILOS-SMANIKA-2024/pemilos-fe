/* eslint-disable react/react-in-jsx-scope */
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export const AnimatedTitle = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false })

  return (
    <motion.h1
      ref={ref}
      initial={{ scale: 0 }}
      animate={{ scale: inView ? 1 : 0 }}
      transition={{
        delay: 0.2,
        duration: 0.5,
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      whileHover={{ scale: 1.1 }}
      className="font-extrabold text-3xl md:text-5xl text-center"
    >
      {children}
    </motion.h1>
  )
}
