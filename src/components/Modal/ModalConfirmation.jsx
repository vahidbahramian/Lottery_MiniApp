import { Modal } from '@mui/material'
import { motion } from 'framer-motion'
import XMark from '../Svg/XMark'

function ModalConfirmation({
  isOpen,
  title,
  message,
  handleConfirm,
  handleCancel,
}) {
  return (
    <Modal open={isOpen} onClose={handleCancel} disableAutoFocus>
      <div className="absolute bottom-unset top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4">
        <div className="w-full pb-4 bg-neutral-900 rounded-[20px] shadow border-2 border-orange-300 border-opacity-80 flex-col justify-start items-start inline-flex">
          <div className="self-stretch h-14 p-4 rounded-tl-2xl rounded-tr-2xl justify-start items-center gap-4 inline-flex">
            <div className="grow shrink basis-0 text-white text-base font-semibold font-['SF Pro Text'] leading-normal truncate">
              {title}
            </div>
            <motion.button
              whileTap={0.95}
              onClick={handleCancel}
              className="w-6 h-6 relative"
            >
              <XMark fill="#FFF" />
            </motion.button>
          </div>
          <div className="self-stretch p-4 flex-col justify-center items-center flex">
            <div className="grow self-stretch w-full h-auto overflow-hidden rounded cursor-pointer flex flex-col justify-center items-center">
              <p className="px-4 grow shrink basis-0 text-[#06f5df] text-base font-semibold font-['Poppins'] leading-tight text-center">
                {message}
              </p>
            </div>
          </div>
          <div className="w-full px-4 py-2 flex flex-row gap-4">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleCancel}
              className="grow self-stretch px-4 py-2 bg-[#2c2c2e] rounded text-white"
            >
              Cancel
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleConfirm}
              className="grow self-stretch px-4 py-2 bg-blue-300 rounded text-neutral-900 text-sm font-bold font-['SF Pro Text'] leading-tight"
            >
              Confirm
            </motion.button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalConfirmation
