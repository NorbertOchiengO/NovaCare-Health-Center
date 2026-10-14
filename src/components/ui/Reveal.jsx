import { motion } from 'motion/react'

// Gentle reveal: content is always visible (opacity never below 0.85) so text is never hidden.
export default function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.85, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
