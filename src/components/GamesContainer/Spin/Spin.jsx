import { spinPlay } from '@/apis/users.jsx'
import IconCoinBig from '@/assets/imgs/common/icon-coin-big.png'
import IconCoinPng from '@/assets/imgs/common/icon-coin.png'
import { LoadingContainer } from '@/components/LoadingContainer/LoadingContainer.jsx'
import ModalNoticeAction from '@/components/Modal/ModalNoticeAction.jsx'
import ModalSpinHistory from '@/components/Modal/ModalSpinHistory.jsx'
import MoneyCounter from '@/components/MoneyCounter/MoneyCounter.jsx'
import MemoIconCheck from '@/components/Svg/IconCheck.jsx'
import MemoIconRight from '@/components/Svg/IconRight.jsx'
import useSpin from '@/hooks/useSpin.jsx'
import useSpinHistory from '@/hooks/useSpinHistory.jsx'
import { formatNumberWithLocale } from '@/utils/common.jsx'
import { BOT_ID } from '@/utils/constants.jsx'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { useWindowSize } from 'react-use'
import IconSpin from '../../Svg/IconSpin.jsx'
import './Spin.css'
import {
  BetOptionIds,
  BetOptions,
  getBetOption,
  getPrizeIcon,
  MAX_BET_VALUE,
  MIN_BET_VALUE,
} from './utils.jsx'

/**
 * @returns {JSX.Element}
 */
export function Spin({ userData, openToastBar, accessToken }) {
  const [initX, setInitX] = useState(0)
  const [initY, setInitY] = useState(0)
  const [isShowActive, setIsShowActive] = useState(false)
  const [numberActive, setNumberActive] = useState(null)
  const [startDeg, setStartDeg] = useState(0)
  const [rotateDeg, setRotateDeg] = useState('rotate(180deg)')
  const [prizeTransition, setPrizeTransition] = useState('none')
  const [duration, setDuration] = useState(6000)

  const isSpiningRef = useRef(false)
  const [isSpining, setIsSpining] = useState(false)

  const { height } = useWindowSize()
  const isEnoughHeight = height > 700
  const [prizes, setPrizes] = useState([])
  const [dataModal, setDataModal] = useState({})

  const [selectedBetId, setSelectedBetId] = useState(BetOptionIds.BET_100)
  const [customBetValue, setCustomBetValue] = useState(BetOptions[0].value)
  const [openModalAction, setOpenModalAction] = useState(false)
  const [openModalHistory, setOpenModalHistory] = useState(false)
  const [balance, setBalance] = useState(userData?.point || 0)

  const { data, isFetching } = useSpin(accessToken)

  const {
    data: spinHistory,
    isFetching: isFetchingHistory,
    refetch: refetchSpinHistory,
  } = useSpinHistory(accessToken)

  const toggleOpenModalHistory = () => {
    setOpenModalHistory((prev) => !prev)
  }

  useEffect(() => {
    if (openModalHistory) {
      refetchSpinHistory().then()
    }
  }, [openModalHistory])

  useEffect(() => {
    if (openModalHistory) {
      refetchSpinHistory().then()
    }
  }, [openModalHistory])

  const onClickCustom = () => {
    setSelectedBetId((prev) => {
      if (prev === BetOptionIds.BET_CUSTOM) {
        setSelectedBetId(BetOptionIds.BET_100)
      } else {
        setSelectedBetId(BetOptionIds.BET_CUSTOM)
      }
    })
  }

  const calculateXY = (Degree) => {
    const Ax = 142.5
    const Ay = 142.5
    const By = 285
    const vertexAngleInRadians = (180 - Degree * 2) * (Math.PI / 180)
    const baseAngleInRadians = 30 * (Math.PI / 180)
    const distanceAB = By - Ay
    const dX = distanceAB / Math.tan(vertexAngleInRadians / 2)
    const X = Ax - dX
    const Y = Ax + dX
    return { X, Y }
  }

  const getSliceAngle = (index) => {
    return (360 / prizes.length) * index
  }

  const getPrizeRotateAngle = (index) => {
    return 180 - getSliceAngle(index)
  }
  const getRandomDelta = () => {
    let ret = Math.round((getSliceAngle(1) * Math.random()) / 4)
    ret = Math.random() > 0.5 ? ret : -ret
    return ret
  }

  const prizeDraw = (prizeIndex, data) => {
    setIsShowActive(false)
    setNumberActive(prizeIndex)

    const addOnCircleCount = 10 + Math.round(Math.random() * 5)
    const roundStartDegree = Math.round(startDeg / 360) * 360
    let randomDelta = getRandomDelta()
    const degree =
      roundStartDegree +
      getPrizeRotateAngle(prizeIndex) +
      addOnCircleCount * 360 +
      randomDelta
    setStartDeg(degree)
    setRotateDeg(`rotate(${degree}deg)`)
    setPrizeTransition(
      `all ${duration / 1000}s cubic-bezier(0.42, 0, 0.2, 0.91)`
    )

    setTimeout(() => {
      setDataModal({
        name: 'SPIN',
        content: 'Your prize',
        point: data.point,
        reward: data.reward,
      })
      setOpenModalAction(true)
      isSpiningRef.current = false
      setIsSpining(false)
      setIsShowActive(true)
      setPrizeTransition('none')
    }, duration)

    setBalance(data.point)
  }

  const rotateHandler = async () => {
    if (isSpining) {
      openToastBar(
        'Pending claim of the last spin, please wait for a few seconds!'
      )
      return false
    }
    if (isSpiningRef.current) return false
    if (customBetValue < MIN_BET_VALUE) {
      openToastBar(`Minimum bet value is ${MIN_BET_VALUE}!`)
      return false
    }
    if (customBetValue > MAX_BET_VALUE) {
      openToastBar(`Maximum bet value is ${MAX_BET_VALUE}!`)
      return false
    }

    isSpiningRef.current = true
    setIsSpining(true)

    try {
      // Initial Fake Spin:
      // const initialSpinDeg = startDeg + 40 * 360
      // setRotateDeg(`rotate(${initialSpinDeg}deg)`)
      // setPrizeTransition(`all ${20}s cubic-bezier(0.42, 0, 0.1, 0.91)`)

      const dataPlay = await spinPlay(BOT_ID, customBetValue, accessToken)
      console.log('data_play', dataPlay)
      if (dataPlay.isSuccess) {
        const prizeIndex = prizes.findIndex(
          (item) => item.id === dataPlay.data.id
        )
        console.log('spin_play', {
          prizeIndex: prizeIndex,
          priceName: dataPlay.data.name,
          prizes: prizes,
          dataPlay: dataPlay.data,
        })
        return prizeDraw(prizeIndex, dataPlay.data)
      } else {
        openToastBar(dataPlay.message)
        isSpiningRef.current = false
        setIsSpining(false)
      }
    } catch (error) {
      console.error('spin_play_err', error)
      isSpiningRef.current = false
      setIsSpining(false)
    }
  }

  useEffect(() => {
    if (data) {
      setPrizes(data)
    }
  }, [data])

  useEffect(() => {
    const cal = calculateXY(180 / prizes.length)
    setInitX(Number(cal.X.toFixed(2)))
    setInitY(Number(cal.Y.toFixed(2)))
  }, [prizes])

  const isCustomBet = selectedBetId === BetOptionIds.BET_CUSTOM

  function handleSetBetValue(id) {
    setSelectedBetId(id)
    setCustomBetValue(getBetOption(id).value)
  }

  const [lightOn, setLightOn] = useState(false)
  useEffect(() => {
    let intervalId
    if (isSpining) {
      function updateLightOn() {
        setLightOn((prev) => !prev)
      }

      intervalId = setInterval(updateLightOn, 200)
    }
    return () => {
      setTimeout(() => {
        clearInterval(intervalId)
      }, 1000)
    }
  }, [isSpining])

  return (
    <>
      {isFetching ? (
        <LoadingContainer className="h-[calc(100vh_-_5rem)]" />
      ) : (
        <>
          <div className="w-full flex-col h-[calc(100vh_-_8rem)] justify-center items-start inline-flex overflow-y-scroll hide-scrollbar px-4">
            <div
              className={clsx(
                'w-full items-center gap-3',
                isEnoughHeight ? 'pt-8 pb-4' : 'py-2'
              )}
            >
              <div className="w-full h-[58px] flex-col justify-start items-center flex">
                <div className="w-full pb-2 justify-start items-center gap-1 inline-flex flex-col">
                  <div className="text-white text-center text-[28px] font-bold font-['SF Pro'] leading-[33.60px]">
                    Spin Now!
                  </div>
                  <div className="w-full flex flex-row items-center justify-center gap-1">
                    <div className="text-white text-center text-[28px] font-bold font-['SF Pro'] leading-[33.60px] flex">
                      <MoneyCounter value={balance} />
                    </div>
                    <img className="w-7 h-7" src={IconCoinBig} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={clsx(
                'my-4 relative flex items-center justify-center mx-auto',
                isEnoughHeight ? 'mt-8 size-[340px]' : 'size-[238px] scale-75'
              )}
            >
              {/*spin*/}
              <div
                className="flex items-center justify-center"
                style={{
                  transform: rotateDeg,
                  transition: prizeTransition,
                }}
              >
                <div className="bg-[#323232] p-[14px] rounded-full clip-path-circle">
                  <div className="bg-white p-0.5 rounded-full clip-path-circle">
                    <div className="bg-[#E3E6E7] p-0.5 rounded-full clip-path-circle">
                      <div className="size-[285px] overflow-hidden relative rounded-full mx-auto ">
                        <div>
                          {prizes.map((price, index) => (
                            <div
                              id={`slice_${index}`}
                              key={index}
                              className={`slice slice1 ${index === numberActive && isShowActive ? 'active' : ''}`}
                              style={{
                                // background: key%2 === 0 ? '#FDA702' : '#FE5653',
                                clipPath: `polygon(142.5px 142.5px, ${initX}px 285px, ${initY}px 285px)`,
                                transform: `rotate(${getSliceAngle(index)}deg)`,
                              }}
                            >
                              <div className="text-white leading-none mt-56 rotate-180">
                                {getPrizeIcon(price.icon)}
                                <p className="text-sm">{price.name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-full absolute z-0">
                  <div className="relative size-[285px]">
                    {prizes.map((price, index) => (
                      <div key={`dot_${index}`}>
                        <div
                          className="top-1/2 left-1/2 absolute"
                          style={{
                            transformOrigin: '0 0',
                            transform: `rotate(${(360 / prizes.length) * index}deg)`,
                          }}
                        >
                          <div
                            className="relative rounded-full bg-white size-[6px]"
                            style={{ marginTop: '137px', right: '48px' }}
                          ></div>
                        </div>
                        <div
                          className="top-1/2 left-1/2 absolute"
                          style={{
                            transformOrigin: '0 0',
                            transform: `rotate(${(360 / prizes.length) * index}deg)`,
                          }}
                        >
                          <div
                            className={clsx(
                              'relative rounded-full size-[8px]',
                              index % 2 === 0
                                ? lightOn
                                  ? 'bg-[#FDA702]'
                                  : 'bg-[#FE5653]'
                                : lightOn
                                  ? 'bg-[#FE5653]'
                                  : 'bg-[#FDA702]'
                            )}
                            style={{ marginTop: '148px' }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pointer-container">
                <div onClick={rotateHandler} className="pointer z-10">
                  <IconSpin />
                  <div
                    className="size-14 bg-[#303336] absolute -z-10 rounded-full"
                    style={{
                      top: '32px',
                      right: '-8px',
                      outline: 'rgb(18 19 18 / 44%) solid 3px',
                    }}
                  ></div>
                  <div
                    className="size-20 bg-[#303336] absolute -z-20 rounded-full"
                    style={{
                      top: '20px',
                      right: '-20px',
                      outline: 'rgb(18 19 18 / 21%) solid 3px',
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div
              className={clsx(
                'w-full py-2 justify-center items-center gap-2 inline-flex grid-3 grid-cols-3',
                isEnoughHeight ? 'pt-4' : 'pt-0'
              )}
            >
              {BetOptions.map(({ id, value }, i) => (
                <button
                  key={`bet_option_${i}`}
                  className={clsx(
                    `grow shrink basis-0 h-9 px-3 py-2 rounded justify-center items-center gap-1 flex`,
                    id === selectedBetId ? 'bg-[#fac06f]' : 'bg-white/10'
                  )}
                  onClick={() => handleSetBetValue(id)}
                >
                  <img className="w-4 h-4" src={IconCoinPng} />
                  <div
                    className={clsx(
                      "text-right text-sm font-bold font-['SF Pro Text'] leading-tight",
                      id === selectedBetId ? 'text-[#111111]' : 'text-[#fac06e]'
                    )}
                  >
                    {formatNumberWithLocale(value)}
                  </div>
                </button>
              ))}
            </div>

            <div className="w-full pb-2 justify-center items-center gap-2 inline-flex hide-scrollbar">
              <div className="w-full h-9 px-3 py-2 bg-white/10 rounded justify-center items-center flex">
                <button
                  className="pr-4 border-r border-white/10 justify-center items-center gap-2 flex"
                  onClick={onClickCustom}
                >
                  <div className="w-5 h-5 relative justify-center items-center flex">
                    <div
                      className={clsx(
                        'w-5 h-5 left-0 top-0 absolute rounded-sm border border-[#444444]',
                        isCustomBet ? 'bg-[#52D09233]' : 'bg-black'
                      )}
                    />
                    <MemoIconCheck />
                  </div>
                  <div className="text-white text-sm font-normal font-['SF Pro Text'] leading-tight">
                    Custom
                  </div>
                </button>
                <div className="grow shrink basis-0 max-w-[calc(100%_-_96px)] h-5 pl-3 justify-center items-center gap-2 flex">
                  <img className="w-4 h-4" src={IconCoinPng} />
                  <NumericFormat
                    className={clsx(
                      "grow shrink max-w-[calc(100%_-_52px)] basis-0 bg-transparent text-[#fac06e] text-sm font-bold font-['SF Pro Text'] leading-tight",
                      !isCustomBet && 'opacity-40'
                    )}
                    thousandSeparator={true}
                    value={customBetValue}
                    decimalScale={4}
                    onValueChange={({ formattedValue, value }) =>
                      setCustomBetValue(Number(value))
                    }
                    disabled={!isCustomBet}
                  />
                  <div
                    className={clsx(
                      "text-white text-[10px] font-normal font-['SF Pro Text'] leading-[14px]",
                      !isCustomBet && 'opacity-40'
                    )}
                  >
                    MAX
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 fixed bottom-[88px] left-0 justify-start items-start gap-2 inline-flex">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="grow shrink basis-0 h-11 px-4 py-3 bg-[#1a1a1a] rounded justify-start items-center gap-2 flex"
              onClick={toggleOpenModalHistory}
            >
              <div className="grow shrink basis-0 text-white text-sm font-bold font-['SF Pro Text'] leading-tight">
                History
              </div>
              <MemoIconRight />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={rotateHandler}
              disabled={isSpining}
              className="grow shrink basis-0 h-11 px-4 py-3 bg-blue-300 rounded justify-center items-center gap-2 cursor-pointer"
            >
              <div className="text-center text-neutral-900 text-sm font-bold font-['SF Pro Text'] leading-tight">
                {isSpining ? 'Spinning...' : 'Spin'}
              </div>
            </motion.button>
          </div>
          <ModalNoticeAction
            open={openModalAction}
            onClose={() => setOpenModalAction(false)}
            data={dataModal}
          />
          <ModalSpinHistory
            data={spinHistory}
            open={openModalHistory}
            onClose={toggleOpenModalHistory}
            accessToken={accessToken}
          />
        </>
      )}
    </>
  )
}
