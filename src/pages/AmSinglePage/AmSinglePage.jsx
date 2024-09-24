import { ComingSoon } from '@/components/ComingSoon/ComingSoon.jsx'
import { EarnContainer } from '@/components/EarnContainer/EarnContainer'
import { FriendContainer } from '@/components/FriendContainer/FriendContainer'
import { LeaderboardContainer } from '@/components/LeaderboardContainer/LeaderboardContainer'
import { PlaygroundContainer } from '@/components/PlaygroundContainer/PlaygroundContainer'
import { SplashContainer } from '@/components/SplashContainer/SplashContainer'
import IconEarn from '@/components/Svg/IconEarn'
import IconFriends from '@/components/Svg/IconFriends'
import IconGame from '@/components/Svg/IconGame'
import IconLeaderboard from '@/components/Svg/IconLeaderboard'
import { useAuth } from '@/contexts/authContext'
import useLeaderboardMyRank from '@/hooks/useLeaderboardMyRank'
import useTelegramTaskLeaderboard from '@/hooks/useTelegramTaskLeaderboard'
import useUserData from '@/hooks/useUserData'
import {
  SINGLE_PAGE_ALL_TABS,
  SINGLE_PAGE_TAB_IDS,
} from '@/utils/constants.jsx'
import { Snackbar } from '@mui/material'
import WebApp from '@twa-dev/sdk'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const TAB_OPTIONS = [
  {
    id: SINGLE_PAGE_TAB_IDS.FRIENDS,
    name: 'Friends',
    getIcon: (fill) => <IconFriends fill={fill} />,
    redDot: false,
  },
  {
    id: SINGLE_PAGE_TAB_IDS.EARN,
    name: 'Earn',
    getIcon: (fill) => <IconEarn fill={fill} />,
    redDot: true,
  },
  {
    id: SINGLE_PAGE_TAB_IDS.PLAYGROUND,
    name: 'Playground',
    getIcon: (fill) => <IconGame fill={fill} />,
    redDot: false,
  },
  {
    id: SINGLE_PAGE_TAB_IDS.LEADERBOARD,
    name: 'Leaderboard',
    getIcon: (fill) => <IconLeaderboard fill={fill} />,
    redDot: false,
  },
]

/**
 * @returns {JSX.Element}
 */
export const AmSinglePage = () => {
  const initData = WebApp.initDataUnsafe
  let { accessToken } = useAuth()

  const { data: userData, isLoading: isLoadingUserData } =
    useUserData(accessToken)

  const numberOfTop = 100
  const {
    data: rawLeaderboard,
    isFetching: isFetchingLeaderboard,
    refetch: refetchLeaderboard,
  } = useTelegramTaskLeaderboard(accessToken, numberOfTop)

  const {
    data: myRankData,
    isFetching: isFetchingMyRank,
    refetch: refetchMyRank,
  } = useLeaderboardMyRank(accessToken)

  const [isToast, setIsToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const [tab, setTab] = useState(SINGLE_PAGE_TAB_IDS.EARN)

  //get task param in URL
  let [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')

  useEffect(() => {
    if (tabParam && tab !== tabParam) {
      setTab(tabParam)
    }
  }, [tabParam])

  const openToastBar = (message) => {
    setToastMessage(message)
    setIsToast(true)
  }
  const closeToastBar = () => {
    setIsToast(false)
  }

  const getTabContainer = (tab) => {
    switch (tab) {
      case SINGLE_PAGE_TAB_IDS.EARN:
        return (
          <EarnContainer
            userData={userData}
            isLoadingUserData={isLoadingUserData}
            openToastBar={openToastBar}
            accessToken={accessToken}
          />
        )
      case SINGLE_PAGE_TAB_IDS.FRIENDS:
        return (
          <FriendContainer
            userData={userData}
            isLoadingUserData={isLoadingUserData}
            openToastBar={openToastBar}
            accessToken={accessToken}
          />
        )
      case SINGLE_PAGE_TAB_IDS.LEADERBOARD:
        return (
          <LeaderboardContainer
            rawLeaderboard={rawLeaderboard}
            isFetchingLeaderboard={isFetchingLeaderboard}
            refetchLeaderboard={refetchLeaderboard}
            myRankData={myRankData}
            isFetchingMyRank={isFetchingMyRank}
            refetchMyRank={refetchMyRank}
            openToastBar={openToastBar}
          />
        )
      case SINGLE_PAGE_TAB_IDS.PLAYGROUND:
        // return <ComingSoon />
        return (
          <PlaygroundContainer
            userData={userData}
            isLoadingUserData={isLoadingUserData}
            openToastBar={openToastBar}
            accessToken={accessToken}
          />
        )

      default:
        return <ComingSoon />
    }
  }
  const handleSelectTab = (id) => {
    setTab(id)
    const _searchParams = new URLSearchParams()
    _searchParams.set('tab', id)
    setSearchParams(_searchParams)
  }

  const handleDeeplinkParam = (start_param) => {
    for (let i = 0; i < SINGLE_PAGE_ALL_TABS.length; i++) {
      const tab = SINGLE_PAGE_ALL_TABS[i]
      if (start_param?.indexOf(tab) === 0) {
        const _searchParams = searchParams
        _searchParams.set('tab', tab)
        if (tab === SINGLE_PAGE_TAB_IDS.PLAYGROUND) {
          const task = start_param.split(`${tab}-`)[1]
          if (task) {
            _searchParams.set('task', task)
          }
        }

        setSearchParams(_searchParams)
        return
      }
    }
  }

  useEffect(() => {
    const { start_param } = WebApp.initDataUnsafe || {}
    handleDeeplinkParam(start_param)
  }, [initData])

  if (!userData) {
    return <SplashContainer />
  }

  return (
    <>
      <div className="w-full h-[100vh] bg-black flex flex-col justify-start relative select-none">
        <div className="w-full overflow-scroll hide-scrollbar h-full">
          {getTabContainer(tab)}
        </div>
        <div className="fixed bottom-4 left-0 right-0 mx-4 rounded z-10">
          <div className="w-full grow shrink basis-0 h-16 p-1 bg-white bg-opacity-10 rounded shadow border border-white border-opacity-10 backdrop-blur-xl justify-start items-start gap-1 flex">
            {TAB_OPTIONS.map(({ id, name, getIcon }) => (
              <div
                key={id}
                className="cursor-pointer grow shrink basis-0 p-2 bg-white bg-opacity-10 rounded-sm flex-col justify-center items-center gap-0.5 inline-flex relative"
                onClick={() => handleSelectTab(id)}
              >
                {getIcon(tab === id ? 'white' : '#888888')}
                <div
                  className={clsx(
                    "text-center text-[10px] font-medium font-['SF Pro Display'] leading-[14px]",
                    tab === id ? 'text-white' : 'text-neutral-400'
                  )}
                >
                  {name}
                </div>
                {id === tab && (
                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full absolute top-2 right-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isToast}
        onClose={() => setIsToast(false)}
        message={toastMessage}
        autoHideDuration={1000}
      />
    </>
  )
}
