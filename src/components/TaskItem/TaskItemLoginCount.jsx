import IconCoin from '@/assets/imgs/common/icon-coin.png'
import IconDone from '@/assets/imgs/ic/done.svg'
import IconRight from '@/assets/imgs/ic/right.svg'
import { formatNumberWithLocale } from '@/utils/common'
import { motion } from 'framer-motion'
import { useQueryClient } from '@tanstack/react-query'
import useClaimRewardTask from '@/hooks/useClaimRewardTask'
import { useAuth } from '@/contexts/authContext'
import { EndpointRoute } from '@/utils/constants'
import clsx from 'clsx'

export const TaskItemLoginCount = ({ task, showGoldShower }) => {
  const {
    current_level,
    deep_link,
    description,
    env,
    is_completed,
    level_status,
    progress,
    login_task_id,
    telegram_id,
    img_url,
  } = task || {}
  const levelConfig =
    level_status.find((item) => item.done_status && !item.claimed_status) ||
    level_status.find((item) => !item.done_status && !item.claimed_status) ||
    level_status.find((item) => item.level == current_level)

  const percentageBar = Math.min(
    (progress / levelConfig?.achievement) * 100,
    100
  )

  const queryClient = useQueryClient()
  const { accessToken } = useAuth()
  const cbClaimSuccess = () => {
    showGoldShower()
    queryClient.invalidateQueries({
      queryKey: [EndpointRoute.TASKS_GET_MY_TASKS],
    })
  }

  const cbClaimError = () => {
    console.error('error_get_point')
    queryClient.invalidateQueries({
      queryKey: [EndpointRoute.TASKS_GET_MY_TASKS],
    })
  }

  const { mutate: claimReward, isPending: isPendingClaimReward } =
    useClaimRewardTask(
      login_task_id ?? null,
      env ?? null,
      levelConfig?.level ?? null,
      accessToken ?? null,
      cbClaimSuccess,
      cbClaimError
    )

  const handleClaim = () => {
    if (isPendingClaimReward || !levelConfig) {
      return
    }
    claimReward()
  }

  return (
    <>
      <div className="w-full h-10 pl-3 pr-4 py-3 bg-white bg-opacity-10 rounded justify-start items-center gap-3 inline-flex cursor-pointer">
        <div className="inline-flex justify-start items-center w-full gap-3">
          <img className="w-6 h-6" src={img_url} />
          <div className="grow shrink basis-0 flex-row justify-start items-center gap-1 inline-flex truncate">
            <div className="grow self-stretch justify-start items-center inline-flex">
              <div className="grow shrink basis-0 text-left text-white text-xs font-semibold font-['SF Pro Text'] leading-tight">
                {description} ( {levelConfig?.achievement ?? 0} )
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-end items-center">
            <div className="self-stretch justify-start items-center gap-1 inline-flex">
              <div className="text-left text-orange-300 text-xs font-semibold font-['SF Pro Text'] leading-none">
                +{formatNumberWithLocale(levelConfig?.reward)}
              </div>
              <img className="w-4 h-4" src={IconCoin} />
            </div>
            {!is_completed ? (
              <motion.button
                whileTap={!levelConfig ? { scale: 0.97 } : null}
                onClick={handleClaim}
                className={clsx(
                  'px-3 py-1 rounded-full relative overflow-hidden bg-white bg-opacity-20',
                  levelConfig?.done_status && !isPendingClaimReward
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed'
                )}
                disabled={!(levelConfig?.done_status && !isPendingClaimReward)}
              >
                <div
                  className={clsx(
                    'absolute top-0 left-0 h-full ',
                    isPendingClaimReward
                      ? 'bg-gray-400'
                      : levelConfig?.done_status
                        ? 'bg-blue-300'
                        : 'bg-blue-300 bg-opacity-60'
                  )}
                  style={{
                    width: `${percentageBar}%`,
                    transition: 'width 0.3s ease',
                  }}
                />
                <div className="w-full relative z-10 text-white text-xs font-semibold">
                  {isPendingClaimReward
                    ? 'Claiming...'
                    : levelConfig?.done_status
                      ? 'Claim'
                      : `${progress} / ${levelConfig?.achievement ?? 0}`}
                </div>
              </motion.button>
            ) : (
              <img
                className="w-5 h-5 relative"
                src={is_completed ? IconDone : IconRight}
                alt={is_completed ? 'Claimed' : 'Right'}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
