import { Snackbar } from '@mui/material'
import IconCoin from '@/assets/imgs/common/icon-coin.png'
import { formatPointNum } from '@/utils/common'
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import { useState, useEffect } from 'react'

function SnackBarPointBalance({
  balance,
  isOpen,
  onClose,
  pointToAdd = 0,
  duration = 3000,
}) {
  const motionValue = useMotionValue(balance)
  const rounded = useTransform(motionValue, Math.round)
  const [displayValue, setDisplayValue] = useState(formatPointNum(balance))
  const [showSnackbar, setShowSnackbar] = useState(isOpen)
  useEffect(() => {
    if (isOpen) {
      setShowSnackbar(true)

      animate(motionValue, balance + pointToAdd, {
        duration: duration / 1500,
        ease: 'easeInOut',
      })

      const timer = setTimeout(() => {
        setShowSnackbar(false)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    rounded.on('change', (latest) => {
      setDisplayValue(formatPointNum(latest))
    })
    return () => rounded.clearListeners()
  }, [rounded])

  const variants = {
    hidden: { opacity: 0, y: -100 }, // Start off-screen (fly up)
    visible: { opacity: 1, y: 0 }, // Fly down to its normal position
    exit: { opacity: 0, y: -100 }, // Fly back up off-screen when closing
  }

  return (
    <div className="absolute h-full w-full top-0">
      <AnimatePresence>
        {showSnackbar && (
          <motion.div
            key="snackbar"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => {
              if (!showSnackbar) {
                onClose()
              }
            }}
            className="self-stretch w-full px-3 py-4 rounded-xl shadow backdrop-blur-xl justify-center items-center gap-3 inline-flex bg-blue-400 bg-opacity-40 mt-2 mx-2"
          >
            <div className="text-white text-base font-bold font-['SF Pro Text'] tracking-tight flex justify-center items-center">
              <img src={IconCoin} alt="Coin" className="w-8 h-8 mr-2" />
              <motion.div className="font-bold text-3xl">
                {displayValue}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SnackBarPointBalance
