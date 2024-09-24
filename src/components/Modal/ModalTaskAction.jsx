import IconCoin from '@/assets/imgs/common/icon-coin.png'
import { useAuth } from '@/contexts/authContext'
import useTaskGetPoint from '@/hooks/useTaskGetPoint'
import { QuestType, SocialTaskSubType } from '@/utils/constants'
import { shareInviteUrl } from '@/utils/common'
import useUpdateProgressTask from '@/hooks/useUpdateProgressTask'
import { formatNumberWithLocale } from '@/utils/common'
import { EndpointRoute } from '@/utils/constants'
import { Modal } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { initUtils } from '@telegram-apps/sdk'
import { motion } from 'framer-motion'
import XMark from '../Svg/XMark'
import useClaimRewardTask from '@/hooks/useClaimRewardTask'
import useUpdateClickTime from '@/hooks/useUpdateClickTime'
import { useState } from 'react'

function ModalTaskAction({
  open,
  task,
  showGoldShower,
  onClose,
  userData,
  openToastBar,
}) {
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
    quest_subtype,
    task_id,
    ref_task_id,
    login_task_id,
    telegram_id,
    click_time,
  } = task || {}

  const levelConfig = level_status?.find((item) => item.level === current_level)

  const handleClose = () => onClose()

  //Handle Click Time
  const cbUpdateClickTimeSuccess = () => {
    openToastBar('Open task successfully!')
    onClose()
    queryClient.invalidateQueries({
      queryKey: [EndpointRoute.TASKS_GET_MY_TASKS],
    })
  }
  const cbUpdateClickTimesError = () => {
    console.error('error_click_time')
    openToastBar('Error doing task, please do it again!')
  }

  const { mutate: updateClickTime, isPending: isPendingUpdateClickTime } =
    useUpdateClickTime(
      task_id,
      env,
      accessToken,
      cbUpdateClickTimeSuccess,
      cbUpdateClickTimesError
    )

  //Handle Progress
  const cbUpdateProgressSuccess = () => {
    onClose()
    queryClient.invalidateQueries({
      queryKey: [EndpointRoute.TASKS_GET_MY_TASKS],
    })
  }
  const cbUpdateProgressError = () => {
    console.error('error_update_progress')
    openToastBar('Not Successful')
  }

  const [socialCode, setSocialCode] = useState('')
  const [discordID, setDiscordID] = useState('')

  const handleInputChange = (e) => {
    const valueInput = e.target.value
    const trimmedValue = valueInput.trim()
    if (env == 'youtube') {
      setSocialCode(trimmedValue)
    }
    if (env == 'discord') {
      setDiscordID(trimmedValue)
    }
  }

  const { mutate: updateProgress, isPending: isPendingUpdateProgress } =
    useUpdateProgressTask(
      task_id,
      env,
      accessToken,
      click_time,
      cbUpdateProgressSuccess,
      cbUpdateProgressError
    )

  //Handle Claim
  const cbClaimSuccess = () => {
    showGoldShower()
    onClose()
    queryClient.invalidateQueries({
      queryKey: [EndpointRoute.TASKS_GET_MY_TASKS],
    })
  }

  const cbClaimError = () => {
    console.error('error_get_point')
    openToastBar('Not Successful')
    onClose()
    queryClient.invalidateQueries({
      queryKey: [EndpointRoute.TASKS_GET_MY_TASKS],
    })
  }
  const taskId =
    quest_type === QuestType.REF
      ? ref_task_id
      : quest_type === QuestType.LOGIN
        ? login_task_id
        : task_id

  const { mutate: claimReward, isPending: isPendingClaimReward } =
    useClaimRewardTask(
      taskId,
      env,
      current_level,
      accessToken,
      cbClaimSuccess,
      cbClaimError
    )

  //Other
  const getTextBtn = () => {
    if (isPendingClaimReward || isPendingUpdateProgress) {
      return 'Processing...'
    }
    if (!levelConfig?.done_status) {
      return 'Check'
    } else if (levelConfig?.claimed_status) {
      return 'Claimed'
    } else {
      return 'Claim'
    }
  }

  const doTaskAction = () => {
    if (deep_link) {
      try {
        const sdkUtils = initUtils()
        sdkUtils.openLink(deep_link)
      } catch (error) {
        window.open(deep_link, '_blank')
      }
    }
  }

  const shareLinkInviteFriends = () => {
    if (userData) {
      shareInviteUrl(userData?.refer_code)
    }
  }

  //On click button
  const onClickDoTask = () => {
    if (quest_type == QuestType.REF) {
      shareLinkInviteFriends()
    } else if (
      (quest_type == QuestType.SOCIAL &&
        quest_subtype == SocialTaskSubType.WATCH_YOUTUBE) ||
      env == 'discord'
    ) {
      doTaskAction()
    } else {
      if (deep_link) {
        doTaskAction()
        updateClickTime()
      }
    }
  }

  const onClickCheckBtn = () => {
    if (isPendingClaimReward || isPendingUpdateProgress) {
      return
    }
    if (!levelConfig?.done_status) {
      if (env == 'youtube') {
        updateProgress({ socialCode })
      } else if (env == 'discord') {
        updateProgress({ discordID })
      } else {
        updateProgress()
      }
    } else if (levelConfig?.claimed_status) {
      return
    } else {
      claimReward()
    }
  }

  return (
    <>
      <Modal open={open} onClose={handleClose} disableAutoFocus>
        <div className="absolute bottom-0 lg:bottom-unset lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 w-full lg:w-[480px]">
          <div className="w-full pb-4 bg-neutral-900 rounded-tl-[20px] rounded-tr-[20px] shadow border-t-2 border-orange-300 flex-col justify-start items-start inline-flex">
            <div className="self-stretch h-14 p-4 rounded-tl-2xl rounded-tr-2xl justify-start items-center gap-4 inline-flex">
              <div className="grow shrink basis-0 text-white text-base font-semibold font-['SF Pro Text'] leading-normal">
                4am Task
              </div>
              <motion.button
                whileTap={0.95}
                onClick={handleClose}
                className="w-6 h-6 relative"
              >
                <XMark fill="#FFF" />
              </motion.button>
            </div>
            <div className="self-stretch p-4 flex-col justify-center items-center flex">
              <div className="pb-4 flex-col justify-center items-start flex">
                <img className="w-20 h-20 shadow" src={img_url} />
              </div>
              <div className="w-[241px] pb-4 justify-center items-center gap-2.5 inline-flex">
                <div className="grow shrink basis-0 text-center text-white text-2xl font-bold font-['SF Pro']">
                  {description}
                </div>
              </div>
              <div className="self-stretch pb-4 justify-center items-center gap-2.5 inline-flex">
                <div className="w-full text-center text-white text-sm font-normal font-['SF Pro'] leading-tight">
                  {quest_type === QuestType.REF
                    ? `Invite ${progress ?? 0}/${levelConfig?.achievement ?? 0} friend(s) to complete`
                    : quest_subtype == SocialTaskSubType.WATCH_YOUTUBE
                      ? 'Enter the Code from the video to complete task'
                      : `${description}`}
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onClickDoTask}
                className="w-40 py-2 justify-start items-center gap-2.5 inline-flex"
              >
                <div className="grow shrink basis-0 h-[52px] p-4 bg-blue-300 rounded justify-center items-center gap-2 flex">
                  <div className="text-right text-neutral-900 text-sm font-bold font-['SF Pro Text'] leading-tight">
                    {'Do it'}
                  </div>
                </div>
              </motion.button>

              <div className="self-stretch justify-center items-center gap-1 inline-flex">
                <img className="w-6 h-6" src={IconCoin} />
                <div className="text-right text-white text-2xl font-bold font-['SF Pro Text']">
                  +{formatNumberWithLocale(levelConfig?.reward)}
                </div>
              </div>
            </div>
            {/* input for social code -- YOUTUBE */}
            {quest_type == QuestType.SOCIAL &&
              quest_subtype == SocialTaskSubType.WATCH_YOUTUBE &&
              !levelConfig?.done_status && (
                <div className="self-stretch mx-4 pl-4 py-2 justify-start gap-2.5 h-[52px] rounded flex items-center space-x-4">
                  <label
                    htmlFor="codeInput"
                    className="text-sm font-medium text-white"
                  >
                    Code:
                  </label>
                  <input
                    type="text"
                    id="codeInput"
                    value={socialCode}
                    onChange={handleInputChange}
                    placeholder="Enter code"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            {quest_type == QuestType.SOCIAL &&
              env == 'discord' &&
              !levelConfig?.done_status && (
                <div className="self-stretch mx-4 pl-4 py-2 justify-start gap-2.5 h-[52px] rounded flex items-center space-x-4">
                  <label
                    htmlFor="codeInput"
                    className="text-sm font-medium text-white"
                  >
                    Your&nbsp;Discord&nbsp;ID:
                  </label>
                  <input
                    type="text"
                    id="codeInput"
                    value={discordID}
                    onChange={handleInputChange}
                    placeholder="Enter your Discord ID"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            {/* input */}
            {!(quest_type == QuestType.REF && !levelConfig?.done_status) && (
              <>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={onClickCheckBtn}
                  className="self-stretch px-4 py-2 justify-start items-center gap-2.5 inline-flex"
                  disabled={isPendingClaimReward || isPendingUpdateProgress}
                >
                  <div className="grow shrink basis-0 h-[52px] p-4 bg-blue-300 rounded justify-center items-center gap-2 flex">
                    <div className="text-right text-neutral-900 text-sm font-bold font-['SF Pro Text'] leading-tight">
                      {getTextBtn()}
                    </div>
                  </div>
                </motion.button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalTaskAction
