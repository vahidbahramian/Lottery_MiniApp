import { Modal } from '@mui/material'
import { motion } from 'framer-motion'

/**
 * @param {unknown} error
 * @returns {JSX.Element}
 */
export function ErrorBoundaryError({ error }) {
  const getErrorMessage = (error) => {
    if (error instanceof Error) {
      return error.message
    }
    if (typeof error === 'string') {
      return error
    }
    return JSON.stringify(error)
  }
  const errorMessage = getErrorMessage(error)

  return (
    <Modal
      className="z-[100] hide-scrollbar bg-black"
      open={true}
      disableAutoFocus
      aria-labelledby="no-internet-title"
      aria-describedby="no-internet-description"
    >
      <motion.div className="absolute  bottom-unset top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4">
        <div className="w-full pb-4 bg-white bg-opacity-10 rounded-[20px] shadow border-2 border-line-primary-dark border-opacity-80 flex-col justify-start items-start inline-flex">
          <div className="self-stretch p-4 rounded-tl-2xl rounded-tr-2xl justify-start items-center gap-4 inline-flex">
            <h2 className="grow shrink basis-0 text-white text-xl text-center">
              {'An unhandled error occurred'}
            </h2>
          </div>
          <div className="self-stretch p-4 flex-col justify-center items-center flex">
            <div className="grow self-stretch w-full h-auto overflow-hidden rounded cursor-pointer flex flex-col justify-center items-center">
              <p className="px-4 grow shrink basis-0 text-white text-center">
                {errorMessage}
              </p>
            </div>
          </div>
          <div className="w-full px-4 py-2 flex flex-row gap-4">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                window.location = '/'
              }}
              className="grow self-stretch px-4 py-2 bg-[#fac06f] text-neutral-900 rounded-lg font-bold font-['SF Pro Text'] leading-tight"
            >
              Reload
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Modal>
  )
}
