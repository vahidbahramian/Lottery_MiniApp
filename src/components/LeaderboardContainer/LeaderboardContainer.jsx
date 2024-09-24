import Rank1 from '@/assets/imgs/leaderboard/1.png'
import Rank2 from '@/assets/imgs/leaderboard/2.png'
import Rank3 from '@/assets/imgs/leaderboard/3.png'
import DefaultAvatar from '@/assets/imgs/avatar/img.png'
import {
  formatDisplayNum,
  shortenDisplayText,
  formatNumberWithLocale,
} from '@/utils/common'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { LoadingContainer } from '../LoadingContainer/LoadingContainer'

/**
 * @returns {JSX.Element}
 */
const TABS_IDS = {
  TOP_HOLDER: 1,
  WEEKLY: 2,
  MONTHLY: 3,
}
const TABS = [
  {
    id: TABS_IDS.TOP_HOLDER,
    name: 'Top Holder',
  },
  {
    id: TABS_IDS.WEEKLY,
    name: 'Weekly',
  },
  {
    id: TABS_IDS.MONTHLY,
    name: 'Monthly',
  },
]

export function LeaderboardContainer({
  rawLeaderboard,
  isFetchingLeaderboard,
  refetchLeaderboard,
  myRankData,
  isFetchingMyRank,
  refetchMyRank,
}) {
  // console.log(rawLeaderboard)
  // console.log(myRankData)

  useEffect(() => {
    if (!isFetchingLeaderboard) {
      refetchLeaderboard()
    }

    if (!isFetchingMyRank) {
      refetchMyRank()
    }
  }, [])

  const [tab, setTab] = useState(TABS_IDS.TOP_HOLDER)

  const leaderboardData = rawLeaderboard
  const rank1 = leaderboardData?.[0]
  const rank2 = leaderboardData?.[1]
  const rank3 = leaderboardData?.[2]

  const ranks = useMemo(() => {
    let ret = leaderboardData?.slice(3)
    return ret
  }, [leaderboardData])

  //Note: delete later, dung tam vi cai format number trong common dung ko duoc
  const formatNumberK = (number) => {
    if (number < 1000) return number

    number = ~~(number / 1000)
    return number + 'K'
  }

  return (
    <div className="w-full h-screen flex flex-col overflow-clip">
      {/* header */}
      <div className="w-full px-6 p-4 justify-center items-center gap-2 inline-flex">
        {/*<div*/}
        {/*  className={clsx(*/}
        {/*    'grow shrink basis-0 h-8 bg-neutral-800 rounded border border-white border-opacity-10 justify-start items-center flex'*/}
        {/*  )}*/}
        {/*>*/}
        {/*  {TABS.map(({ id, name }) => (*/}
        {/*    <button*/}
        {/*      onClick={() => setTab(id)}*/}
        {/*      key={id}*/}
        {/*      className={clsx(*/}
        {/*        'grow shrink basis-0 h-8 px-3 py-2 rounded justify-center items-center gap-1 flex',*/}
        {/*        tab === id ? 'bg-blue-300' : 'bg-neutral-800'*/}
        {/*      )}*/}
        {/*    >*/}
        {/*      <div*/}
        {/*        className={clsx(*/}
        {/*          "text-center text-xs font-bold font-['SF Pro Text'] leading-none",*/}
        {/*          id === tab ? 'text-neutral-900' : 'text-neutral-400'*/}
        {/*        )}*/}
        {/*      >*/}
        {/*        {name}*/}
        {/*      </div>*/}
        {/*    </button>*/}
        {/*  ))}*/}
        {/*</div>*/}
      </div>
      {isFetchingLeaderboard && !rawLeaderboard ? (
        <LoadingContainer className="h-[calc(100vh_-_5rem)]" />
      ) : (
        <>
          {/* 1 2 3 */}
          <div className="w-full justify-center items-end gap-0.5 inline-flex">
            <div className="w-[120px] flex-col justify-center items-center gap-6 inline-flex">
              <div className="flex-col justify-start items-center gap-2 flex">
                <img src={Rank2} alt="top-2" />
                <div className="flex-col justify-start items-center gap-1 flex">
                  <div className="text-center text-white text-lg font-bold font-['SF Pro Text'] leading-[18px]">
                    {formatNumberK(rank2?.point)}
                  </div>
                  <div className="text-center text-neutral-400 text-xs font-normal font-['SF Pro Text']">
                    {shortenDisplayText(rank2?.name, 12)}
                  </div>
                  <img
                    className="w-6 h-6 rounded-full"
                    src={rank2?.avatar || DefaultAvatar}
                  />
                </div>
              </div>
              <div className="w-[100px] h-5 bg-slate-300 rounded-tl rounded-tr" />
            </div>
            <div className="flex-col justify-start items-center gap-6 inline-flex">
              <div className="flex-col justify-start items-center gap-2 flex">
                <img src={Rank1} />
                <div className="flex-col justify-start items-center gap-1 flex">
                  <div className="text-center text-white text-xl font-bold font-['SF Pro Text'] leading-tight">
                    {formatNumberK(rank1?.point)}
                  </div>
                  <div className="text-center text-neutral-400 text-xs font-normal font-['SF Pro Text']">
                    {shortenDisplayText(rank1?.name, 12)}
                  </div>
                  <img
                    className="w-6 h-6 rounded-full"
                    src={rank1?.avatar || DefaultAvatar}
                  />
                </div>
              </div>
              <div className="w-[100px] h-8 bg-blue-300 rounded-tl rounded-tr" />
            </div>
            <div className="w-[120px] flex-col justify-start items-center gap-6 inline-flex">
              <div className="flex-col justify-start items-center gap-2 flex">
                <img src={Rank3} />
                <div className="flex-col justify-start items-center gap-1 flex">
                  <div className="text-center text-white text-lg font-bold font-['SF Pro Text'] leading-[18px]">
                    {formatNumberK(rank3?.point)}
                  </div>
                  <div className="text-center text-neutral-400 text-xs font-normal font-['SF Pro Text']">
                    {shortenDisplayText(rank3?.name, 12)}
                  </div>
                  <img
                    className="w-6 h-6 rounded-full"
                    src={rank3?.avatar || DefaultAvatar}
                  />
                </div>
              </div>
              <div className="w-[100px] h-4 bg-yellow-600 rounded-tl rounded-tr" />
            </div>
          </div>
          {/* 4 ... n user rank */}
          <div
            className={clsx(
              'grow w-full pt-4 rounded-tl rounded-tr shadow border-t border-white border-opacity-10 backdrop-blur-xl justify-start items-start gap-2 inline-flex relative mb-24',
              'h-[calc(100%_-_280px)]'
            )}
          >
            <div className="mb-40 grow shrink basis-0 self-stretch pb-4 flex-col justify-start items-start gap-2 inline-flex px-4 overflow-scroll hide-scrollbar">
              {ranks?.map(({ rank, avatar, name, point, telegram_id }) => (
                <div
                  key={rank}
                  className={clsx(
                    `self-stretch p-3 rounded shadow backdrop-blur-xl justify-start items-center gap-3 inline-flex`,
                    telegram_id === myRankData[0]?.telegram_id
                      ? 'bg-blue-300 bg-opacity-40'
                      : 'bg-white bg-opacity-10'
                  )}
                >
                  <div
                    className={clsx(
                      'w-8 h-8  rounded-[40px] border border-white border-opacity-10 flex-col justify-center items-center inline-flex',
                      'bg-black bg-opacity-10'
                    )}
                  >
                    <div className="text-white text-xs font-bold font-['SF Pro Text']">
                      {rank}
                    </div>
                  </div>
                  <img
                    className="w-6 h-6 rounded-full"
                    src={avatar || DefaultAvatar}
                  />

                  <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                    <div className="self-stretch text-white text-base font-medium font-['SF Pro Text'] leading-tight">
                      {shortenDisplayText(name || 'Anonymous', 12)}
                    </div>
                  </div>
                  <div className="text-white text-base font-bold font-['SF Pro Text'] tracking-tight">
                    {formatNumberK(point)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* my rank */}
          {myRankData && (
            <div className="fixed left-0 right-0 mx-4 bottom-[88px] h-14 p-3 bg-white bg-opacity-10 rounded shadow border border-white border-opacity-10 backdrop-blur-xl justify-start items-center gap-3 flex">
              <div className="w-8 h-8 bg-blue-300 rounded-[40px] border border-white border-opacity-10 flex-col justify-center items-center inline-flex">
                <div className="text-neutral-900 text-xs font-bold font-['SF Pro Text']">
                  {myRankData[0]?.rank}
                </div>
              </div>
              <img
                className="w-6 h-6 rounded-full"
                src={myRankData[0]?.avatar || DefaultAvatar}
              />
              <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                <div className="self-stretch text-white text-base font-medium font-['SF Pro Text'] leading-tight">
                  {myRankData[0]?.name}
                </div>
              </div>
              <div className="text-white text-base font-bold font-['SF Pro Display'] tracking-tight">
                {formatNumberK(myRankData[0]?.point)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
