/* eslint-disable react/react-in-jsx-scope */
'use client'
import { motion, useScroll, useSpring } from 'framer-motion'

export const ScrollIndicator: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className={`bg-purple-primary fixed w-full h-[0.5rem] z-20 bottom-0`}
    />
  )
}
