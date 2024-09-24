import { formatNumberWithLocale } from '@/utils/common'
import { useAuth } from '@/contexts/authContext'
import { Modal } from '@mui/material'
import { motion } from 'framer-motion'
import XMark from '../Svg/XMark'
import IconDaily from '@/assets/imgs/common/icon-daily-feature.png'
import IconCoin from '@/assets/imgs/common/icon-daily-coin.png'
import clsx from 'clsx'
import { LoginTaskSubType } from '@/utils/constants'
import { useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import useClaimRewardTask from '@/hooks/useClaimRewardTask'
import { EndpointRoute } from '@/utils/constants'

function ModalDailyRewards({ open, onClose, handleClaimEffect, data }) {
  const handleClose = () => onClose()
  const queryClient = useQueryClient()
  const { accessToken } = useAuth()
  const {
    current_level,
    deep_link,
    description,
    img_url,
    env,
    is_completed,
    level_status,
    progress,
    quest_type,
    task_id,
    ref_task_id,
    login_task_id,
    telegram_id,
  } = data || {}
  const [claimedCount, setClaimedCount] = useState(0)
  const [claimableCount, setClaimableCount] = useState(0)
  const [dayToClaim, setDayToClaim] = useState(null)
  const [allDays, setAllDays] = useState(null)

  useEffect(() => {
    if (data) {
      setAllDays(data['level_status'])
      const { dayToClaim, claimableCount, claimedCount } = data[
        'level_status'
      ].reduce(
        (acc, item) => {
          if (item.claimed_status === true) {
            acc.claimedCount++
          }
          if (item.done_status === true) {
            acc.claimableCount++
          }
          if (item.done_status === true && item.claimed_status === false) {
            acc.dayToClaim = item
          }
          return acc
        },
        { dayToClaim: null, claimableCount: 0, claimedCount: 0 }
      )
      setClaimedCount(claimedCount)
      setClaimableCount(claimableCount)
      setDayToClaim(dayToClaim)
    } else {
      setClaimedCount(0)
      setClaimableCount(0)
      setDayToClaim(null)
    }
    return () => {}
  }, [data])

  const cbClaimSuccess = () => {
    handleClaimEffect('Claim reward successfully', true)
    setIsPendingClaimReward(false)
    onClose()
    queryClient.invalidateQueries({
      queryKey: [EndpointRoute.TASKS_GET_MY_TASKS],
    })
  }

  const cbClaimError = () => {
    console.error('error_get_point')
    handleClaimEffect('Error claim reward', false)
    setIsPendingClaimReward(false)
    onClose()
    queryClient.invalidateQueries({
      queryKey: [EndpointRoute.TASKS_GET_MY_TASKS],
    })
  }

  const { mutate: claimReward } = useClaimRewardTask(
    login_task_id ?? null,
    env ?? null,
    null,
    accessToken ?? null,
    cbClaimSuccess,
    cbClaimError
  )

  const [isPendingClaimReward, setIsPendingClaimReward] = useState(false)
  const handleClaim = (level) => {
    if (isPendingClaimReward || !dayToClaim || !data) {
      return
    }
    setIsPendingClaimReward(true)
    claimReward({ customLevel: level })
  }

  return (
    <Modal open={open} onClose={handleClose} disableAutoFocus>
      <div className="absolute bottom-0 lg:bottom-unset lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 w-full lg:w-[480px]">
        <div className="w-full pb-4 bg-neutral-900 rounded-tl-[20px] rounded-tr-[20px] shadow border-t-2 border-orange-300 flex-col justify-start items-start inline-flex">
          <div className="self-stretch h-14 p-4 rounded-tl-2xl rounded-tr-2xl justify-start items-center gap-4 inline-flex">
            <div className="grow shrink basis-0 text-white text-base font-semibold font-['SF Pro Text'] leading-normal">
              Login Task
            </div>
            <motion.button
              whileTap={0.95}
              onClick={handleClose}
              className="w-6 h-6 relative"
            >
              <XMark fill="#FFF" />
            </motion.button>
          </div>

          <div className="self-stretch h-full p-4 pt-0 flex-col justify-start items-center flex">
            <div className="w-20 h-20 flex-col justify-center items-center flex relative">
              <img
                className="w-full h-full scale-[2] object-contain"
                src={IconDaily}
              />
            </div>
            <div className="w-full text-center text-white text-2xl font-bold font-['SF Pro'] mt-4">
              {data?.description ?? 'Login Task'}
            </div>
            <div className="text-center text-white text-sm font-normal font-['SF Pro'] leading-tight mt-4">
              {data?.quest_subtype === LoginTaskSubType.CONSECUTIVE_LOGIN
                ? 'The "Consecutive Login" task rewards users for logging in daily over consecutive days.'
                : data?.quest_subtype === LoginTaskSubType.LOGIN_COUNT
                  ? 'The "Login Count" task rewards users for reaching a specific total number of logins.'
                  : 'The login mission rewards users for consistently logging into their account over time.'}
            </div>

            <div className="w-full grid grid-cols-4 grid-flow-row gap-2 mt-4 overflow-y-scroll hide-scrollbar">
              {allDays?.length > 0 &&
                allDays?.map(
                  ({
                    login_task_id,
                    achievement,
                    level,
                    claimed_status,
                    done_status,
                  }) => (
                    <DayItem
                      key={login_task_id + '_' + level}
                      day={achievement}
                      level={level}
                      claimedStatus={claimed_status}
                      doneStatus={done_status}
                      claimableDay={claimableCount}
                      handleClaim={handleClaim}
                    />
                  )
                )}
            </div>
          </div>

          <motion.button
            whileTap={!dayToClaim ? { scale: 0.97 } : null}
            onClick={() => {
              handleClaim(dayToClaim?.level)
            }}
            className="self-stretch px-4 py-2 justify-start items-center gap-2.5 inline-flex disabled:cursor-not-allowed"
            disabled={!(dayToClaim && !isPendingClaimReward)}
          >
            <div
              className={clsx(
                'grow shrink basis-0 h-[52px] p-4 rounded justify-center items-center gap-2 flex',
                dayToClaim && !isPendingClaimReward
                  ? ' bg-blue-300'
                  : ' bg-gray-400 cursor-not-allowed'
              )}
            >
              <div className="text-right text-neutral-900 text-sm font-bold font-['SF Pro Text'] leading-tight">
                {isPendingClaimReward
                  ? 'Claiming reward...'
                  : dayToClaim
                    ? 'Claim'
                    : 'Not available to claim'}
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalDailyRewards

const DayItem = ({
  day,
  level,
  onClick,
  claimedDay,
  claimableDay,
  handleClaim,
  claimedStatus,
  doneStatus,
}) => {
  const [isClaimed, setIsClaimed] = useState(claimedStatus)
  const [isClaimable, setIsClaimable] = useState(doneStatus)
  const [isFuture, setIsFuture] = useState(day > claimableDay)
  useEffect(() => {
    if (isClaimed != claimedStatus) {
      setIsClaimed(claimedStatus)
    }
    if (isClaimable != doneStatus) {
      setIsClaimable(doneStatus)
    }
    if (isFuture != day > claimableDay) {
      setIsFuture(day > claimableDay)
    }
  }, [claimedStatus, doneStatus, claimableDay, day])
  return (
    <motion.button
      className={clsx(
        'w-full h-[88px] p-2 rounded-lg flex-col justify-center items-center gap-[5px] inline-flex',
        isClaimed && 'bg-[#3c8945]',
        (isClaimed || isClaimable) && 'border-2 border-[#41934a]',
        isFuture && 'border-2 border-[#444444]'
      )}
      animate={
        isClaimable
          ? {
              borderColor: ['#41934a', '#41934a80', '#41934a'],
            }
          : {}
      }
      transition={
        isClaimable
          ? {
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse',
            }
          : {}
      }
      onClick={() => {
        if (isClaimable) {
          handleClaim(level)
        }
      }}
    >
      <div className="text-right text-white text-xs font-semibold font-['SF Pro Text']">
        Day {day}
      </div>
      <img className="w-7 h-7" src={IconCoin} />
      <div className="text-right text-white text-xs font-semibold font-['SF Pro Text']">
        {formatNumberWithLocale(day * 100)}
      </div>
    </motion.button>
  )
}
