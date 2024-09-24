import { useEffect, useState } from 'react'

const CountdownButton = () => {
  const calculateSecondsUntilMidnightGMT = () => {
    const now = new Date()
    const tomorrowGMT = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + 1,
        0,
        0,
        0
      )
    )
    return Math.floor((tomorrowGMT - now) / 1000)
  }

  const [time, setTime] = useState(calculateSecondsUntilMidnightGMT())

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    const s = String(seconds % 60).padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <button
      type="button"
      className="min-w-[75px] px-3 py-0.5 text-xs text-center text-white bg-white bg-opacity-10 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
    >
      {formatTime(time)}
    </button>
  )
}

export default CountdownButton
