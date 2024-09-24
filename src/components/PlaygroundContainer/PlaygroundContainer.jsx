import { motion } from 'framer-motion'
import { LoadingContainer } from '../LoadingContainer/LoadingContainer'

import IconBrandLogo from '@/assets/imgs/common/4am-logo.png'
import IconTask0 from '@/assets/imgs/playground/task-0.svg'
import IconTaskTapToEarn from '@/assets/imgs/playground/task-1-taptoearn.svg'

import { PLAYGROUND_TAB_TASK_OPTIONS } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Spin } from '../GamesContainer/Spin/Spin'
import { TapToEarn } from '../GamesContainer/TapToEarn/TapToEarn'
import MemoIconRight from '../Svg/IconRight'
import { Link } from '../Link/Link'

/**
 * @returns {JSX.Element}
 */
export function PlaygroundContainer({
  userData,
  isLoadingUserData,
  openToastBar,
  accessToken,
}) {
  const navigate = useNavigate()
  const [task, setTask] = useState(PLAYGROUND_TAB_TASK_OPTIONS.ALL_TASKS)
  //get task param in URL
  let [searchParams, setSearchParams] = useSearchParams()
  const taskParam = searchParams.get('task')

  useEffect(() => {
    const handleURLChange = () => {
      const newTaskParam = searchParams.get('task')
      if (newTaskParam && newTaskParam !== task) {
        setTask(newTaskParam)
      } else if (
        !newTaskParam &&
        task !== PLAYGROUND_TAB_TASK_OPTIONS.ALL_TASKS
      ) {
        setTask(PLAYGROUND_TAB_TASK_OPTIONS.ALL_TASKS)
      }
    }

    handleURLChange()

    window.addEventListener('popstate', handleURLChange)

    return () => {
      window.removeEventListener('popstate', handleURLChange)
    }
  }, [searchParams, task])

  const onChangeTask = (task) => {
    setTask(task)
    const currentSearchParams = searchParams
    currentSearchParams.set('task', task)
    setSearchParams(currentSearchParams)
  }

  if (task === PLAYGROUND_TAB_TASK_OPTIONS.TASK_SPIN) {
    return (
      <Spin
        userData={userData}
        accessToken={accessToken}
        openToastBar={openToastBar}
      />
    )
  }
  const showLoading = isLoadingUserData && !userData

  if (task === PLAYGROUND_TAB_TASK_OPTIONS.TASK_TAP_TO_EARN) {
    return (
      <TapToEarn
        userData={userData}
        accessToken={accessToken}
        openToastBar={openToastBar}
      />
    )
  }

  return (
    <>
      <div className="w-full px-6 py-4 justify-center items-center gap-2 inline-flex"></div>
      {showLoading ? (
        <LoadingContainer className="h-[calc(100vh_-_5rem)]" />
      ) : (
        <div className="w-full h-[calc(100vh_-_5rem)] justify-start items-center flex flex-col gap-3 px-4">
          <Link to="/index">
            <img className="w-[100px] h-8" src={IconBrandLogo} />{' '}
          </Link>

          <div>
            <span className="text-[#06f5df] text-[28px] font-bold font-['Poppins'] leading-[33.60px]">
              Have fun
            </span>
            <span className="text-[#faae1a] text-[28px] font-bold font-['Poppins'] leading-[33.60px]">
              ,
            </span>
            <span className="text-white text-[28px] font-bold font-['Poppins'] leading-[33.60px]">
              {' '}
            </span>
            <span className="text-[#fba0e7] text-[28px] font-bold font-['Poppins'] leading-[33.60px]">
              get PTS
            </span>
          </div>

          <motion.div className="w-full flex flex-col justify-start items-center gap-3 mt-3">
            <motion.div
              whileTap={{ scale: 0.97 }}
              className="w-full pl-3 pr-4 py-3 bg-white/10 rounded justify-start items-center gap-3 inline-flex"
              onClick={() => {
                onChangeTask(PLAYGROUND_TAB_TASK_OPTIONS.TASK_SPIN)
              }}
            >
              <img className="w-12 h-12" src={IconTask0} />
              <div className="grow shrink basis-0 flex-col justify-center items-start gap-1 inline-flex">
                <div className="self-stretch justify-start items-start inline-flex">
                  <div className="grow shrink basis-0 text-[#fba0e7] text-sm font-semibold font-['Poppins'] leading-tight">
                    Spin-a-wheel
                  </div>
                </div>
                <div className="self-stretch justify-start items-center gap-1 inline-flex">
                  <div className="text-right text-[#fac06e] text-xs font-semibold font-['Poppins'] leading-none">
                    Play
                  </div>
                </div>
              </div>
              <MemoIconRight />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.97 }}
              className="w-full pl-3 pr-4 py-3 bg-white/10 rounded justify-start items-center gap-3 inline-flex"
              onClick={() => {
                onChangeTask(PLAYGROUND_TAB_TASK_OPTIONS.TASK_TAP_TO_EARN)
              }}
            >
              <img className="w-12 h-12" src={IconTaskTapToEarn} />
              <div className="grow shrink basis-0 flex-col justify-center items-start gap-1 inline-flex">
                <div className="self-stretch justify-start items-start inline-flex">
                  <div className="grow shrink basis-0 text-[#fba0e7] text-sm font-semibold font-['Poppins'] leading-tight">
                    Tap To Earn
                  </div>
                </div>
                <div className="self-stretch justify-start items-center gap-1 inline-flex">
                  <div className="text-right text-[#fac06e] text-xs font-semibold font-['Poppins'] leading-none">
                    Tap Now!
                  </div>
                </div>
              </div>
              <MemoIconRight />
            </motion.div>
          </motion.div>
        </div>
      )}
    </>
  )
}
