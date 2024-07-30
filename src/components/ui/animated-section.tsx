/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedSectionProps {
  id?: string
  children: React.ReactNode[] | React.ReactNode
  className?: string
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  ...props
}) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false })

  return (
    <motion.section
      id={props.id}
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
      exit={{ scale: 0 }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  )
}
