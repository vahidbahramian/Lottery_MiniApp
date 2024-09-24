import IconCoin from '@/assets/imgs/common/icon-coin-big.png'
import { formatNumberWithLocale } from '@/utils/common'
import { Modal } from '@mui/material'
import { motion } from 'framer-motion'
import XMark from '../Svg/XMark'

function ModalNoticeAction({ open, onClose, data }) {
  const handleClose = () => onClose()

  return (
    <Modal open={open} onClose={handleClose} disableAutoFocus>
      <div className="absolute bottom-0 lg:bottom-unset lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 w-full lg:w-[480px]">
        <div className="w-full pb-4 bg-neutral-900 rounded-tl-[20px] rounded-tr-[20px] shadow border-t-2 border-orange-300 flex-col justify-start items-start inline-flex">
          <div className="self-stretch h-14 p-4 rounded-tl-2xl rounded-tr-2xl justify-start items-center gap-4 inline-flex">
            <div className="grow shrink basis-0 text-white text-base font-semibold font-['SF Pro Text'] leading-normal">
              {data.name}
            </div>
            <motion.button
              whileTap={0.95}
              onClick={handleClose}
              className="w-6 h-6 relative"
            >
              <XMark fill="#FFF" />
            </motion.button>
          </div>
          <div className="self-stretch h-[258px] p-4 flex-col justify-center items-center flex">
            <div className="pb-4 flex-col justify-center items-start flex">
              <img className="w-20 h-20 shadow" src={IconCoin} />
            </div>
            <div className="w-[241px] pb-4 justify-center items-center gap-2.5 inline-flex">
              <div className="grow shrink basis-0 text-center text-white text-2xl font-bold font-['SF Pro']">
                {data.title}
              </div>
            </div>
            <div className="self-stretch pb-4 justify-center items-center gap-2.5 inline-flex">
              <div className="w-full text-center text-white text-sm font-normal font-['SF Pro'] leading-tight">
                {data.content}
              </div>
            </div>
            <div className="self-stretch justify-center items-center gap-1 inline-flex">
              <img className="w-8 h-8" src={IconCoin} />
              <div className="text-right text-white text-2xl font-bold font-['SF Pro Text']">
                {(data.reward > 0 ? '+' : '') +
                  formatNumberWithLocale(data.reward)}
              </div>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleClose}
            className="self-stretch px-4 py-2 justify-start items-center gap-2.5 inline-flex"
          >
            <div className="grow shrink basis-0 h-[52px] p-4 bg-blue-300 rounded justify-center items-center gap-2 flex">
              <div className="text-right text-neutral-900 text-sm font-bold font-['SF Pro Text'] leading-tight">
                Close
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalNoticeAction
