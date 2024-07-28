/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {
  ForwardRefComponent,
  HTMLMotionProps,
  motion,
  useInView,
} from 'framer-motion'
import { useRef } from 'react'

interface AnimatedSectionProps
  extends ForwardRefComponent<HTMLElement, HTMLMotionProps<'section'>> {
  children: React.ReactNode[]
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
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  )
}
