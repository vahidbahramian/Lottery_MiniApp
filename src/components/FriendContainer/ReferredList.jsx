import { shortenDisplayText, formatPointNum } from '@/utils/common'
import DefaultAvatar from '@/assets/imgs/avatar/img.png'
import IconCoin from '@/assets/imgs/common/icon-coin.png'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import useUserTaskClaimRefMonth from '@/hooks/useUserTaskClaimRefMonth.jsx'
import GoldCoinShower from '../GoldCoinShower/GoldCoinShower'
import SnackBarPointBalance from '../SnackBarPointBalance/SnackBarPointBalance'

function ReferredList({ rawUserMyReferral, accessToken, openToastBar }) {
  const referredUsersList =
    rawUserMyReferral['telegram_id_invited']?.sort(
      (a, b) => b.point - a.point
    ) ?? []
  const totalEarn = Math.floor(
    rawUserMyReferral['telegram_id_invited']?.reduce(
      (acc, item) => acc + item.point / 10,
      0
    ) ?? 0
  )
  const periodStartTime = rawUserMyReferral['period_start_time']
  const daysLeftToClaim = periodStartTime
    ? Math.max(
        0,
        30 -
          Math.floor(
            (Date.now() - new Date(periodStartTime)) / (1000 * 60 * 60 * 24)
          )
      )
    : 30

  const [isDisabledClaimButton, setIsDisabledClaimButton] = useState(false)
  const [claimable, setClaimable] = useState(rawUserMyReferral['claimable'])
  const [isAnimateGoldShower, setIsAnimateGoldShower] = useState(false)

  //For Snack-bar
  const [isOpenSnackbarPointBalance, setIsOpenSnackbarPointBalance] =
    useState(false)
  const [currentPoint, setCurrentPoint] = useState(0)
  //mutation to claim point
  const mutationAddPoint = useUserTaskClaimRefMonth(
    accessToken,
    () => {
      openToastBar('Error: Problems with adding points')
      setIsDisabledClaimButton(false)
    },
    ({ current_point }) => {
      setCurrentPoint(current_point)
      showGoldShower()
      showSnackBarPoint()
      setClaimable(false)
    }
  )

  const handleMutation = () => {
    try {
      if (totalEarn === 0) {
        openToastBar('0 points, nothing to claim.')
        setIsDisabledClaimButton(false)
        return
      }
      mutationAddPoint.mutate()
    } catch (error) {
      console.error('Ref: Error updating point:', error)
    }
  }

  const handleClaim = () => {
    setIsDisabledClaimButton(true)
    handleMutation()
  }

  useEffect(() => {
    setClaimable(rawUserMyReferral['claimable'])
  }, [rawUserMyReferral['claimable']])

  const showGoldShower = () => {
    setIsAnimateGoldShower(true)
  }

  const hideGoldShower = () => {
    setIsAnimateGoldShower(false)
  }

  const showSnackBarPoint = () => {
    setIsOpenSnackbarPointBalance(true)
  }

  const hideSnackBarPoint = () => {
    setIsOpenSnackbarPointBalance(false)
  }

  return (
    <>
      <div className="grow w-full pt-4 rounded-tl rounded-tr shadow border-t border-white border-opacity-10 backdrop-blur-xl justify-start items-start gap-2 inline-flex relative mb">
        <div className="mb-28 grow shrink basis-0 self-stretch pb-4 flex-col justify-start items-start gap-2 inline-flex overflow-scroll hide-scrollbar">
          {/* total earn */}
          <div className="self-stretch p-3 rounded shadow backdrop-blur-xl justify-start items-center gap-3 inline-flex bg-blue-400 bg-opacity-50">
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="self-stretch text-white text-sm font-medium font-['SF Pro Text'] leading-tight">
                Total Earning per month
                <div className="text-xs">(10% of your friends' points)</div>
                <div className="text-xs">
                  {claimable
                    ? 'You can claim the profit now!'
                    : `${daysLeftToClaim} days left to claim`}
                </div>
              </div>
            </div>
            <div className="text-white text-base font-bold font-['SF Pro Text'] tracking-tight flex">
              {claimable ? (
                <motion.button
                  whileTap={!isDisabledClaimButton ? { scale: 0.95 } : null}
                  onClick={handleClaim}
                  className="col-span-1 flex justify-center items-center bg-blue-300 px-4 py-3 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isDisabledClaimButton}
                >
                  {!isDisabledClaimButton ? (
                    <>
                      <span className="text-white font-bold">Claim</span>
                      <img
                        src={IconCoin}
                        alt="Coin"
                        className="w-6 h-6 ml-2 mr-2"
                      />
                      <span className="text-white font-bold">
                        {formatPointNum(totalEarn)}
                      </span>
                    </>
                  ) : (
                    <span className="text-white font-bold">Waiting...</span>
                  )}
                </motion.button>
              ) : (
                <>
                  +{' '}
                  <img
                    src={IconCoin}
                    alt="Coin"
                    className="w-6 h-6 mr-2 ml-2"
                  />
                  {formatPointNum(totalEarn)}
                </>
              )}
            </div>
          </div>
          {/* referred list */}
          {referredUsersList?.map(({ avatar, name, point, telegram_id }) => (
            <div
              key={telegram_id}
              className="self-stretch p-3 rounded shadow backdrop-blur-xl justify-start items-center gap-3 inline-flex bg-white bg-opacity-10"
            >
              <img
                className="w-6 h-6 rounded-full"
                src={avatar || DefaultAvatar}
              />

              <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                <div className="self-stretch text-white text-base font-medium font-['SF Pro Text'] leading-tight">
                  {shortenDisplayText(name || 'Anonymous', 12)}
                </div>
              </div>
              <div className="text-white text-base font-bold font-['SF Pro Text'] tracking-tight flex">
                <img src={IconCoin} alt="Coin" className="w-6 h-6 mr-2" />
                {formatPointNum(point)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed top-0 left-1/2 flex justify-center items-center">
        <div className="fixed top-0 z-50 flex justify-center items-center">
          {isAnimateGoldShower && (
            <GoldCoinShower
              isShow={isAnimateGoldShower}
              onFinish={hideGoldShower}
            />
          )}
        </div>
        <div className="fixed top-2 z-10 w-[calc(100vw_-_2rem)] flex justify-center -translate-x-2">
          {isOpenSnackbarPointBalance && (
            <SnackBarPointBalance
              isOpen={isOpenSnackbarPointBalance}
              onClose={hideSnackBarPoint}
              balance={currentPoint}
              pointToAdd={totalEarn}
              duration={3000}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default ReferredList
