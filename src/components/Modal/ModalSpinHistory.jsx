import IconCoin from '@/assets/imgs/common/icon-coin.png'

import {
  capitalizeFirstLetter,
  formatDisplayNum,
  formatNumberWithLocale,
} from '@/utils/common'
import { Modal } from '@mui/material'
import { motion } from 'framer-motion'
import IconGame from '../Svg/IconGame'
import XMark from '../Svg/XMark'

const getEndResult = (point, reward) => {
  const addedPoint = point + reward
  if (addedPoint > 0) {
    return {
      name: 'Win',
      prize: `+${formatDisplayNum(reward)}`,
      textColor: 'text-green-400',
    }
  } else if (addedPoint === 0) {
    return {
      name: 'Draw',
      prize: `+${formatDisplayNum(reward)}`,
      textColor: 'text-white',
    }
  } else {
    return {
      name: 'Lose',
      prize: `-${formatDisplayNum(Math.abs(point))}`,
      textColor: 'text-red-400',
    }
  }
}

function ModalSpinHistory({ open, onClose, data }) {
  const handleClose = () => onClose()

  return (
    <Modal open={open} onClose={handleClose} disableAutoFocus>
      <div className="absolute bottom-0 lg:bottom-unset lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 w-full h-[75vh] bg-neutral-900">
        <div className="w-full h-full pb-4 rounded-tl-[20px] rounded-tr-[20px] shadow border-t-2 border-orange-300 flex-col justify-start items-start inline-flex">
          <div className="self-stretch h-14 p-4 rounded-tl-2xl rounded-tr-2xl justify-start items-center gap-4 inline-flex">
            <div className="grow shrink basis-0 text-white text-base font-semibold font-['SF Pro Text'] leading-normal">
              Spin History
            </div>
            <motion.button
              whileTap={0.95}
              onClick={handleClose}
              className="w-6 h-6 relative"
            >
              <XMark fill="#FFF" />
            </motion.button>
          </div>
          {data?.length > 0 ? (
            <div className="w-full px-4 flex flex-col items-center gap-1 overflow-auto">
              {data.map(
                (
                  {
                    name,
                    point,
                    reward,
                    playTxId,
                    playTxHash,
                    rewardTxHash,
                    status,
                    timestamp = 0,
                  },
                  index
                ) => {
                  const endResult = getEndResult(point, reward)
                  return (
                    <div
                      key={playTxId}
                      className="w-full p-3 bg-white/10 rounded-lg shadow backdrop-blur-xl justify-start items-center gap-3 inline-flex"
                    >
                      <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                        <div className="flex flex-row justify-start items-center gap-1">
                          <p className="self-stretch text-white text-base font-medium font-['SF Pro Text'] leading-tight mt-0.5">
                            {`Spend `}
                            <span className="text-orange-300">
                              {formatNumberWithLocale(Math.abs(point))}
                            </span>
                          </p>
                          <img className="w-6 h-6" src={IconCoin} />
                        </div>
                        <div className="text-center text-[#999999] text-xs font-normal font-['SF Pro Text']">
                          {`${new Date(timestamp).toLocaleDateString()}`}{' '}
                        </div>
                      </div>
                      <div className="flex flex-col justify-start items-right gap-1">
                        <p className="self-stretch text-[#999999] text-right text-base font-medium font-['SF Pro Text'] leading-tight italic">
                          {capitalizeFirstLetter(status)}
                        </p>
                        <div className="flex flex-row justify-end items-center gap-1">
                          <p className="text-base font-bold font-['SF Pro Text'] tracking-tight text-orange-300">
                            {formatNumberWithLocale(reward)}
                          </p>
                          <img className="w-6 h-6" src={IconCoin} />
                        </div>
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          ) : (
            <div className="self-stretch p-4 flex-col justify-center items-center flex">
              <div className="pb-4 flex-col justify-center items-start flex">
                <IconGame fill={'#888888'} width={64} height={64} />
              </div>
              <div className="w-full pb-4 justify-center items-center gap-2.5 inline-flex">
                <div className="grow shrink basis-0 text-center text-white text-2xl font-bold font-['SF Pro']">
                  Lots of prizes are waiting.
                  <br />
                  Let's spin the wheel!
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleClose}
                className="self-stretch px-4 py-2 justify-start items-center gap-2.5 inline-flex"
              >
                <div className="grow shrink basis-0 h-[52px] p-4 bg-blue-300 rounded justify-center items-center gap-2 flex">
                  <div className="text-right text-neutral-900 text-sm font-bold font-['SF Pro Text'] leading-tight">
                    Back to Play
                  </div>
                </div>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ModalSpinHistory
