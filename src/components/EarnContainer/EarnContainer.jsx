import DefaultAvatar from '@/assets/imgs/avatar/img.png'
import IconCoinBig from '@/assets/imgs/common/icon-coin-big.png'

import ModalTaskAction from '@/components/Modal/ModalTaskAction'
import MoneyCounter from '@/components/MoneyCounter/MoneyCounter.jsx'
import { TaskItem } from '@/components/TaskItem/TaskItem'
import { TaskItemLoginCount } from '@/components/TaskItem/TaskItemLoginCount'
import useUserTasks from '@/hooks/useUserTasks'

import { postWalletConnect } from '@/apis/users'
import { shareInviteUrl } from '@/utils/common'
import { LoginTaskSubType, QuestType, RefTaskSubType } from '@/utils/constants'
import {
  TonConnectButton,
  useTonAddress,
  useTonWallet,
} from '@tonconnect/ui-react'
import { useEffect, useMemo, useState } from 'react'
import { FallbackImage } from '../FallbackImage/FallbackImage'
import GoldCoinShower from '../GoldCoinShower/GoldCoinShower'
import ModalDailyRewards from '../Modal/ModalDailyRewards'
import { sortTasks } from './utils'

/**
 * @returns {JSX.Element}
 */
export const EarnContainer = ({
  userData,
  isLoadingUserData,
  openToastBar,
  accessToken,
}) => {
  const wallet = useTonWallet()
  const userFriendlyAddress = useTonAddress(true)

  const {
    account: { chain, publicKey, address },
    device: { appName, appVersion, maxProtocolVersion, platform, features },
  } = wallet || { account: {}, device: {} }

  useEffect(() => {
    console.log('user_friendly_address', userFriendlyAddress)
    if (userFriendlyAddress && accessToken) {
      postWalletConnect(userFriendlyAddress, accessToken)
    }
  }, [userFriendlyAddress, accessToken])

  const [showBalanceDetails, setShowBalanceDetails] = useState(false)
  const [isAnimateGoldShower, setIsAnimateGoldShower] = useState(false)
  const isShowLoading = isLoadingUserData && !userData

  const {
    status: statusTasks,
    data: tasksData,
    isFetching: isFetchingTasks,
  } = useUserTasks(accessToken)

  const { status, tasks } = tasksData || {}

  const toggleBalanceDetails = () => {
    setShowBalanceDetails((prev) => !prev)
  }

  const showGoldShower = () => {
    setIsAnimateGoldShower(true)
  }

  const hideGoldShower = () => {
    setIsAnimateGoldShower(false)
  }

  const tasksLoginConsecutive = useMemo(
    () =>
      sortTasks(
        tasks?.filter(
          (task) =>
            task.quest_type === QuestType.LOGIN &&
            task.quest_subtype === LoginTaskSubType.CONSECUTIVE_LOGIN
        )
      ),
    [tasks]
  )

  const tasksLoginCount = useMemo(
    () =>
      sortTasks(
        tasks?.filter(
          (task) =>
            task.quest_type === QuestType.LOGIN &&
            task.quest_subtype === LoginTaskSubType.LOGIN_COUNT
        )
      ),
    [tasks]
  )

  const tasksRef = useMemo(
    () =>
      sortTasks(
        tasks?.filter(
          (task) =>
            task.quest_type === QuestType.REF &&
            task.quest_subtype === RefTaskSubType.INVITE_FRIENDS
        )
      ),
    [tasks]
  )

  const tasksSocial = useMemo(
    () =>
      sortTasks(tasks?.filter((task) => task.quest_type === QuestType.SOCIAL)),
    [tasks]
  )

  //Handle Social + Ref Task
  const [openTaskAction, setOpenTaskAction] = useState(false)
  const [chosenTask, setChosenTask] = useState()

  //Handle Login Task
  const [isOpenModalDailyRewards, setIsOpenModalDailyRewards] = useState(false)
  const [chosenLoginTask, setChosenLoginTask] = useState(null)

  const openModalTaskAction = (task) => {
    setOpenTaskAction(true)
    setChosenTask(task)
  }

  const closeModalTaskAction = () => {
    setOpenTaskAction(false)
    setChosenTask(null)
  }

  const openModalDailyRewards = (task) => {
    setIsOpenModalDailyRewards(true)
    setChosenLoginTask(task)
  }

  const closeModalDailyRewards = () => {
    setIsOpenModalDailyRewards(false)
    setChosenLoginTask(null)
  }

  // Handle Claim Effect for Modal, and close Modals
  const handleClaimEffect = (message, showGold = false) => {
    openToastBar(message)
    if (showGold) {
      showGoldShower()
    }
    closeModalTaskAction()
    closeModalDailyRewards()
  }

  // useKeyPressEvent('1', openModalDailyRewards)

  const shareLinkInviteFriends = () => {
    if (userData) {
      shareInviteUrl(userData?.refer_code)
    } else {
      openToastBar('Referral link not found!')
    }
  }

  return (
    <>
      <div className="w-full flex flex-col justify-start px-4 mb-20">
        <div className="w-full pt-4 pb-2 flex-col justify-start items-start gap-2.5 inline-flex">
          <div className="self-stretch bg-white bg-opacity-10 rounded flex-col justify-center items-start gap-3 flex">
            <div className="self-stretch p-3 justify-between items-center inline-flex gap-3">
              <div className="grow shrink basis-0 h-10 justify-start items-center flex">
                {isShowLoading ? (
                  <div className="w-10 h-10"></div>
                ) : (
                  <FallbackImage
                    className="!w-10 !h-10 rounded-[48px] border-white border-opacity-10 mr-3"
                    src={userData?.avatar || DefaultAvatar}
                    alt="avatar"
                    fallbackSrc={DefaultAvatar}
                    width={40}
                    height={40}
                  />
                )}

                <div className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
                  <div className="self-stretch text-white text-base font-semibold font-['SF Pro Text']">
                    {isShowLoading
                      ? 'Loading...'
                      : userData?.username ||
                        userData?.firstname ||
                        'Anonymous'}
                  </div>
                  <div className="self-stretch text-white text-sm font-semibold font-['SF Pro Text']">
                    {isShowLoading ? 'Loading...' : userData?.tier}
                  </div>
                </div>

                <TonConnectButton />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-2 flex-col justify-start items-center inline-flex">
          <div className="w-full flex justify-center items-center relative">
            <img
              className="size-16 rounded-full m-auto shadow"
              src={IconCoinBig}
            />
            {isAnimateGoldShower && (
              <GoldCoinShower
                isShow={isAnimateGoldShower}
                onFinish={hideGoldShower}
              />
            )}
          </div>

          <div className="flex-col justify-start items-center flex mt-0">
            <div className="justify-start items-center gap-1 inline-flex">
              {userData && <MoneyCounter value={userData?.point ?? 0} />}
              <div className="text-white text-xl font-bold font-['SF Pro Text'] leading-normal">
                {' '}
                PTS
              </div>
            </div>
          </div>
        </div>
        <div className="w-[full] text-white text-sm font-bold font-['SF Pro Text'] leading-tight">
          Login Tasks
        </div>
        <div className="w-full h-full pt-2 pb-2 flex-col justify-start items-start gap-1 inline-flex">
          {tasksLoginConsecutive?.length > 0 &&
            tasksLoginConsecutive?.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                openModalTaskAction={openModalDailyRewards}
              />
            ))}
          {tasksLoginCount?.length > 0 &&
            tasksLoginCount?.map((task, index) => (
              <TaskItemLoginCount
                key={index}
                task={task}
                showGoldShower={showGoldShower}
              />
            ))}
        </div>

        <div className="w-[full] text-white text-sm font-bold font-['SF Pro Text'] leading-tight">
          Social Tasks
        </div>
        <div className="w-full h-full pt-2 pb-2 flex-col justify-start items-start gap-1 inline-flex">
          {tasksSocial?.length > 0 &&
            tasksSocial?.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                openModalTaskAction={openModalTaskAction}
              />
            ))}
        </div>
        <div className="w-[full] text-white text-sm font-bold font-['SF Pro Text'] leading-tight">
          Referral Tasks
        </div>
        <div className="w-full h-full pt-2 pb-2 flex-col justify-start items-start gap-1 inline-flex">
          {tasksRef?.length > 0 &&
            tasksRef?.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                openModalTaskAction={openModalTaskAction}
              />
            ))}
        </div>
      </div>

      <ModalTaskAction
        open={openTaskAction}
        task={chosenTask}
        showGoldShower={showGoldShower}
        openToastBar={openToastBar}
        onClose={closeModalTaskAction}
        userData={userData}
      />
      <ModalDailyRewards
        open={isOpenModalDailyRewards}
        showGoldShower={showGoldShower}
        onClose={closeModalDailyRewards}
        data={chosenLoginTask}
        handleClaimEffect={handleClaimEffect}
      />
    </>
  )
}
