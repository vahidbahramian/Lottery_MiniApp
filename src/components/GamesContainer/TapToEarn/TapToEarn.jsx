import IconCoinBig from '@/assets/imgs/common/icon-coin-big.png'
import IconCoinPng from '@/assets/imgs/common/icon-coin.png'
import { LoadingContainer } from '@/components/LoadingContainer/LoadingContainer.jsx'
import { formatNumberWithLocale } from '@/utils/common.jsx'
// import MoneyCounter from '@/components/MoneyCounter/MoneyCounter.jsx'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import useUserAddPoint from '@/hooks/useUserAddPoint.jsx'
import { useWindowSize } from 'react-use'
import './TapToEarn.css'

import TapButton from '@/assets/imgs/taptoearn/tapbutton.svg'
import { debounce, throttle } from 'lodash'
import { generateFlyingPoint, triggerHapticFeedback } from './utils.jsx'

/**
 * @returns {JSX.Element}
 */
export function TapToEarn({ userData, accessToken, openToastBar }) {
  //Manage Point and Levels
  const [balance, setBalance] = useState(userData?.point || 0)
  const [lastExecuted, setLastExecuted] = useState(Date.now())
  // const [addedPoint, setAddedPoint] = useState(0)
  const addedPointRef = useRef(0)
  const [tapLevel, setTapLevel] = useState(1)
  // const baseUpgradePrice = 10
  //End Manage Point

  const { height } = useWindowSize()
  const isEnoughHeight = height > 600

  const containerRef = useRef(null)

  const mutationAddPoint = useUserAddPoint(accessToken, () => {
    openToastBar('Error: Problems with adding points')
  })

  // Function to handle the mutation
  const handleMutation = () => {
    try {
      if (addedPointRef.current === 0) return
      mutationAddPoint.mutate({ point: addedPointRef.current })
      addedPointRef.current = 0 // Reset the points after mutation
    } catch (error) {
      console.error('TapToEarn: Error updating point:', error)
    }
  }

  const throttleHandleMutation = throttle(
    () => {
      const now = Date.now()
      if (now - lastExecuted >= 1000) {
        // Ensure it only runs once every second
        handleMutation()
        setLastExecuted(now)
      }
    },
    1000,
    { leading: true, trailing: false }
  )

  const handleButtonClick = (event) => {
    triggerHapticFeedback()
    generateFlyingPoint(tapLevel, containerRef, event)

    //Add to balance
    setBalance((prev) => prev + tapLevel)
    addedPointRef.current += tapLevel
    throttleHandleMutation()
  }

  useEffect(() => {
    return () => {
      throttleHandleMutation.cancel() // Cancels any pending execution
      handleMutation()
    }
  }, [])

  return (
    <>
      {true === false ? (
        //Used for loading component
        <LoadingContainer className="h-[calc(100vh_-_5rem)]" />
      ) : (
        <>
          <div
            className={clsx(
              'w-full flex-col justify-center items-start inline-flex overflow-y-scroll hide-scrollbar px-4 bg-black',
              isEnoughHeight ? 'h-[calc(100vh_-_6rem)]' : 'pb-20'
            )}
          >
            <div
              className={clsx(
                'w-full items-center gap-3',
                isEnoughHeight ? 'pt-8 pb-4' : 'py-2'
              )}
            >
              <div className="w-full h-[58px] flex-col justify-start items-center flex">
                <div className="w-full pb-2 justify-start items-center gap-1 inline-flex flex-col">
                  <div className="text-white text-center text-[28px] font-bold font-['SF Pro'] leading-[33.60px]">
                    Tap To Earn Now!
                  </div>
                  <div className="w-full flex flex-row items-center justify-center gap-1">
                    <div className="text-white text-center text-[28px] font-bold font-['SF Pro'] leading-[33.60px] flex">
                      <motion.div className="font-bold text-orange-300 text-3xl">
                        {formatNumberWithLocale(balance)}
                      </motion.div>
                    </div>
                    <img className="w-7 h-7" src={IconCoinBig} />
                  </div>
                </div>
              </div>
            </div>

            {/*Tap Image Area*/}
            <div
              className={clsx(
                'w-full bg-cover bg-center my-4 relative flex items-center justify-center mx-auto h-full rounded-3xl',
                isEnoughHeight ? 'mt-8 size-[340px]' : 'size-[238px]'
              )}
              style={{
                backgroundImage:
                  "url('https://scontent.fhan14-2.fna.fbcdn.net/v/t1.15752-9/456309032_2769502873219182_6631331103424831034_n.png?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_ohc=g_5gUaJ_es4Q7kNvgEXmXCH&_nc_ht=scontent.fhan14-2.fna&oh=03_Q7cD1QHccXMTtNyX4A0BtpAQp5MZwHZE-C7FrvoxS0SC_Sli4A&oe=66ED4195')",
              }}
            >
              {/* Tap Button */}
              <div
                className="flex items-center justify-center relative"
                ref={containerRef}
              >
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.1 }} // Shorten the animation duration
                  // onClick={handleButtonClick}
                  onTouchStart={handleButtonClick} // Handle touch start
                  onTouchEnd={(e) => e.preventDefault()} // Prevent default behavior on touch end
                  className="rounded-full overflow-hidden relative button-rapid-touch"
                >
                  <img
                    className={clsx(
                      'rounded-full',
                      isEnoughHeight
                        ? 'w-60 h-60 sm:w-70 sm:h-70 md:w-80 md:h-80'
                        : 'w-[40] h-[40vh]'
                    )}
                    src={TapButton}
                  />
                  <img
                    className={clsx(
                      'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
                      isEnoughHeight
                        ? 'w-20 h-20 sm:w-25 sm:h-25 md:w-28 md:h-28'
                        : 'w-[14vh] h-[14vh]'
                    )}
                    src={IconCoinBig}
                  />
                </motion.button>
              </div>
              {/* Tap Button End */}
            </div>

            <div className="p-4 rounded-lg w-full max-w-md mx-auto">
              {/* First Upgrade Button */}
              <div className="grid grid-cols-3 items-center p-3">
                {/* Left: Description Text */}
                <span className="col-span-2 text-white font-bold text-left">
                  Upgrade: Coin per tap (+{tapLevel})
                </span>
                {/* Right: Button with Icon and Value */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="col-span-1 flex justify-center items-center bg-blue-300 px-2 py-3 rounded"
                >
                  <img src={IconCoinPng} alt="Coin" className="w-6 h-6 mr-2" />
                  <span className="text-neutral-900 font-bold">1,000</span>
                </motion.button>
              </div>

              {/* Second Upgrade Button */}
            </div>
          </div>
        </>
      )}
    </>
  )
}
