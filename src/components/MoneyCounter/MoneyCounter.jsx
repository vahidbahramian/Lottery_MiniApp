import { formatNumberWithLocale } from '@/utils/common.jsx'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

const MoneyCounter = ({ value, walletAddress }) => {
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, Math.round)
  const [displayValue, setDisplayValue] = useState(formatNumberWithLocale(0))
  const [internalValue, setIntervalValue] = useState(0)

  useEffect(() => {
    if (value !== internalValue) {
      setIntervalValue(value)
    }
    animate(motionValue, value, { duration: 1, ease: 'easeInOut' })
  }, [walletAddress, motionValue, setIntervalValue])

  useEffect(() => {
    rounded.on('change', (latest) => {
      setDisplayValue(formatNumberWithLocale(latest))
    })
    return () => rounded.clearListeners()
  }, [rounded])

  return (
    <motion.div className="font-bold text-orange-300 text-3xl">
      {displayValue}
    </motion.div>
  )
}

export default MoneyCounter
