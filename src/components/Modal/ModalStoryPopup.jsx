import IconCoin from '@/assets/imgs/common/icon-coin.png'
import IconCoinBig from '@/assets/imgs/common/icon-coin-big.png'
import IconStory from '../Svg/IconStory'

import { formatNumberWithLocale } from '@/utils/common'
import { Modal } from '@mui/material'
import { motion } from 'framer-motion'
import XMark from '../Svg/XMark'

import { postEvent } from '@telegram-apps/sdk'
import { useRef } from 'react'
import { useWindowSize } from 'react-use'
import { domToCanvas } from 'modern-screenshot'

function ModalStoryPopup({ open, userData, onClose }) {
  const { height } = useWindowSize()
  const isEnoughHeight = height > 600

  const handleClose = () => onClose()
  const elementRef = useRef(null)
  const onClickBtn = () => {
    if (elementRef.current === null) {
      return null
    }
    domToCanvas(elementRef.current, {
      scale: 2,
    }).then((canvas) => {
      try {
        const text = 'Join *App Name Here* now and claim all the coins!'
        postEvent('web_app_share_to_story', {
          media_url: canvas.toDataURL('image/png'),
          text: text.slice(0, 2048),
          widget_link: {
            // url: link here
          },
        })
      } catch (e) {
        console.error('Error posting story: ' + e)
      }
    })
  }

  return (
    <>
      <Modal open={open} onClose={handleClose} disableAutoFocus>
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 overflow-y-scroll hide-scrollbar">
          <div className="absolute bottom-0 w-full bg-neutral-900 rounded-tl-2xl rounded-tr-2xl shadow border-t-2 border-orange-300 flex-col justify-start items-start overflow-y-scroll hide-scrollbar h-[calc(100%_-_100px)]">
            <div className="w-full self-stretch h-14 p-4 justify-start items-center gap-4 inline-flex sticky top-0 bg-neutral-900">
              <div className="grow shrink basis-0 text-white text-base font-semibold font-['SF Pro Text'] leading-normal">
                Mini App Name
              </div>
              <motion.button
                whileTap={0.95}
                onClick={handleClose}
                className="w-6 h-6"
              >
                <XMark fill="#FFF" />
              </motion.button>
            </div>
            <div
              className="w-full bg-neutral-900 self-stretch px-4 flex-col justify-center items-center flex overflow-y-scroll hide-scrollbar"
              ref={elementRef}
            >
              {isEnoughHeight ? (
                <div className="mb-2 flex-col justify-center items-start flex">
                  <img className="w-20" src={IconCoinBig} />
                </div>
              ) : null}

              <div className="w-[241px] justify-center items-center gap-2.5 inline-flex">
                <div className="grow shrink basis-0 text-center text-white text-2xl font-bold font-['SF Pro']">
                  @4amTelegram
                </div>
              </div>
              <div className="w-[241px] pb-4 justify-center items-center gap-2.5 inline-flex">
                <div className="grow shrink basis-0 text-center text-white text-2xl font-bold font-['SF Pro']">
                  Hello {userData?.firstname || 'Anonymous'}!
                </div>
              </div>
              <div className="self-stretch pb-4 justify-center items-center gap-2.5 inline-flex">
                <div className="w-full text-center text-white text-sm font-normal font-['SF Pro'] leading-tight">
                  Thank you for being a valuable member!
                </div>
              </div>
              <div className="self-stretch justify-center items-center gap-1 inline-flex">
                <img className="w-6 h-6" src={IconCoin} />
                <div className="text-right text-white text-2xl font-bold font-['SF Pro Text']">
                  {formatNumberWithLocale(userData?.point || 0)}
                </div>
              </div>

              <div className="py-4 px-6 flex-col justify-center items-center flex">
                <img
                  className="w-[50vh]"
                  src="https://scontent.fhan14-3.fna.fbcdn.net/v/t31.18172-8/26757190_1958658204456080_1291125377415167630_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_ohc=CE6FLPxy1h4Q7kNvgFZQ-JK&_nc_ht=scontent.fhan14-3.fna&oh=00_AYDM2mjt8rqmjkfRMdrvVIItsW-7m9hVewXXl-p8Zk88zA&oe=66ECD7A2"
                />
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onClickBtn}
              className="w-full px-4 pb-4 justify-start items-center gap-2.5 inline-flex sticky bottom-0 bg-neutral-900"
            >
              <div className="grow shrink basis-0 h-[52px] p-4 bg-green-500 rounded justify-center items-center gap-2 flex">
                <div className="text-right text-neutral-900 text-sm font-bold font-['SF Pro Text'] leading-tight">
                  Share To Telegram Story
                </div>
                <IconStory />
              </div>
            </motion.button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalStoryPopup
