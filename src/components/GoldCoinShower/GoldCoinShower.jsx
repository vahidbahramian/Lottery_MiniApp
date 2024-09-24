import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import IconCoinHalo from '@/assets/imgs/common/icon-coin-halo.png'

function GoldCoinShower({ isShow, onFinish }) {
  const [coins, setCoins] = useState([])

  useEffect(() => {
    if (isShow) {
      const coinCount = 50
      const newCoins = Array.from({ length: coinCount }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * 500, // Start above the viewport
      }))
      setCoins(newCoins)
    }
  }, [isShow])

  const targetPoint = { x: window.innerWidth / 2 - 40, y: 0 }

  const coinVariants = {
    initial: { opacity: 0 },
    animate: ({ x, y }) => ({
      x: targetPoint.x,
      y: targetPoint.y,
      opacity: 0,
      scale: 1,
      transition: {
        duration: 1 + Math.random(), // Vary animation duration
        ease: 'easeInOut',
      },
    }),
  }

  return (
    <div className="absolute h-full w-screen top-0">
      <AnimatePresence>
        {coins.map((coin) => (
          <motion.img
            key={coin.id}
            src={IconCoinHalo}
            className="absolute rounded-full bg-yellow-500 h-20 w-20"
            initial={{ x: coin.x, y: coin.y, opacity: 1, scale: 0.8 }}
            animate={coinVariants.animate.bind(null, coin)}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => {
              if (coin.id === coins.length - 1) {
                onFinish()
              }
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default GoldCoinShower
