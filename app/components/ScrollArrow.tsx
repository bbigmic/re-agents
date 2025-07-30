'use client'

import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

interface ScrollArrowProps {
  targetRef: React.RefObject<HTMLElement>
  className?: string
}

export default function ScrollArrow({ targetRef, className = '' }: ScrollArrowProps) {
  const scrollToNext = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <motion.div
      className={`absolute bottom-8 inset-x-0 mx-auto cursor-pointer w-fit min-w-[120px] ${className}`}
      onClick={scrollToNext}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="grid place-items-center w-full">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDownIcon className="h-8 w-8 text-white drop-shadow-lg" />
        </motion.div>
        <motion.p
          className="text-white text-sm mt-2 text-center drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          Przewiń dalej
        </motion.p>
      </div>
    </motion.div>
  )
} 