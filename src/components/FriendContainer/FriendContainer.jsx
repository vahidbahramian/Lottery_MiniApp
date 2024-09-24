import { motion } from 'framer-motion'

import CircularProgress from '@mui/material/CircularProgress'

import IconCoin from '@/assets/imgs/common/icon-coin.png'
import IconTelegramPremium from '@/assets/imgs/common/telegram-premium.png'
import IconInvite from '@/assets/imgs/referral/icon-invite.svg'

import IconRight from '@/assets/imgs/ic/right.svg'
import { InvitedUserItem } from '@/components/InvitedUserItem/InvitedUserItem'
import ModalStoryPopup from '@/components/Modal/ModalStoryPopup'
import useUserInvited from '@/hooks/useUserInvited'
import useUserMyReferral from '@/hooks/useUserMyReferral'
import { copyToClipBoard, shareInviteUrl } from '@/utils/common'
import { INVITE_FRIENDS_URL } from '@/utils/constants'
import IconCopyOutline from '../Svg/IconCopyOutline'
import IconReferral from '../Svg/IconReferral'
import IconStory from '../Svg/IconStory'
import ReferredList from './ReferredList'

import { useState, useEffect } from 'react'

/**
 * @returns {JSX.Element}
 */
export function FriendContainer({ userData, openToastBar, accessToken }) {
  const { data: usersInvited, isFetching } = useUserInvited(accessToken)
  const shareLinkInviteFriends = () => {
    if (userData) {
      shareInviteUrl(userData?.refer_code)
    } else {
      openToastBar('Referral link not found!')
    }
  }

  const copyLink = () => {
    if (!userData) {
      openToastBar('Referral link not found!')
    }
    const referralLink = INVITE_FRIENDS_URL + userData?.refer_code
    copyToClipBoard(referralLink)
    openToastBar('Copy referral link successfully!')
  }

  const [openStoryAction, setOpenActionModal] = useState(false)

  const openModalStoryAction = () => {
    setOpenActionModal(true)
  }

  const closeModalStoryAction = () => {
    setOpenActionModal(false)
  }

  //Handle user referred list
  const {
    data: rawUserMyReferral,
    isFetching: isFetchingUserMyReferral,
    refetch: refetchUserMyReferral,
  } = useUserMyReferral(accessToken)
  useEffect(() => {
    if (!isFetchingUserMyReferral) {
      refetchUserMyReferral()
    }
  }, [])

  return (
    <>
      <div>
        <div className="w-full h-[calc(100%_-_280px)] flex-col justify-start items-start inline-flex px-4">
          <div className="w-full h-[106px] pt-8 pb-4 flex-col justify-start items-center gap-3 flex">
            <div className="w-full h-[58px] flex-col justify-start items-center flex">
              <div className="pb-2 justify-start items-center gap-1 inline-flex">
                <p className="text-white text-[28px] font-bold font-['SF Pro'] leading-[33.60px]">
                  Invite Frenz!
                </p>
              </div>
              <div className="justify-center items-center inline-flex">
                <div className="text-center text-white text-sm font-normal font-['SF Pro Text'] leading-none">
                  Bonus time ???
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex-col justify-start items-start flex">
            <div className="w-full h-[180px] pt-2 pb-4 flex-col justify-start items-start gap-3 flex">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="self-stretch w-full pl-3 pr-4 py-3 bg-white bg-opacity-10 rounded justify-start items-center gap-3 inline-flex"
                onClick={shareLinkInviteFriends}
              >
                <img src={IconInvite} />
                <div className="grow shrink basis-0 flex-col justify-center items-start gap-1 inline-flex">
                  <div className="self-stretch justify-start items-start inline-flex">
                    <div className="grow shrink basis-0 text-left text-white text-sm font-semibold font-['SF Pro Text'] leading-tight">
                      Invite a Fren
                    </div>
                  </div>
                  <div className="self-stretch justify-start items-center gap-1 inline-flex">
                    <img className="w-5 h-5" src={IconCoin} />
                    <div className="text-left text-orange-300 text-xs font-semibold font-['SF Pro Text'] leading-none">
                      +10,000
                    </div>
                    <div className="text-left text-white text-xs font-normal font-['SF Pro Text'] leading-none">
                      and exclusive rewards
                    </div>
                  </div>
                </div>
                <img className="w-5 h-5 relative" src={IconRight} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="self-stretch w-full pl-3 pr-4 py-3 bg-white bg-opacity-10 rounded justify-start items-center gap-3 inline-flex"
                onClick={shareLinkInviteFriends}
              >
                <img
                  src={IconTelegramPremium}
                  className="size-10 rounded-full"
                />
                <div className="grow shrink basis-0 flex-col justify-center items-start gap-1 inline-flex">
                  <div className="self-stretch justify-start items-start inline-flex">
                    <div className="grow shrink basis-0 text-left text-white text-sm font-semibold font-['SF Pro Text'] leading-tight">
                      Invite a Fren premium
                    </div>
                  </div>
                  <div className="self-stretch justify-start items-center gap-1 inline-flex">
                    <img className="w-5 h-5" src={IconCoin} />
                    <div className="text-left text-orange-300 text-xs font-semibold font-['SF Pro Text'] leading-none">
                      +50,000
                    </div>
                    <div className="text-left text-white text-xs font-normal font-['SF Pro Text'] leading-none">
                      and exclusive rewards
                    </div>
                  </div>
                </div>
                <img className="w-5 h-5 relative" src={IconRight} />
              </motion.button>
            </div>
          </div>
          <div className="w-full flex-col justify-start items-start flex">
            <div className="w-full py-2 rounded-tl-2xl rounded-tr-2xl justify-start items-center gap-4 inline-flex">
              <div className="grow shrink basis-0 text-white text-base font-bold font-['SF Pro Text'] leading-tight">
                Ur Frenz
              </div>
            </div>
            {/* Referred user list  */}
            {isFetchingUserMyReferral && !rawUserMyReferral ? (
              <div className="w-full flex items-center justify-center h-[calc(100%_-_280px)] pt-10">
                <CircularProgress className="size-8" />
              </div>
            ) : (
              <>
                <ReferredList
                  rawUserMyReferral={rawUserMyReferral}
                  openToastBar={openToastBar}
                  accessToken={accessToken}
                />
              </>
            )}
            {/* Referred user list  */}
            <div className="w-full pt-2 mb-20 flex-col justify-start items-start gap-3 flex">
              {usersInvited?.length > 0 &&
                usersInvited.map((item) => (
                  <InvitedUserItem key={item.id} data={item} />
                ))}
            </div>
          </div>
          <ModalStoryPopup
            open={openStoryAction}
            userData={userData}
            onClose={closeModalStoryAction}
          />
        </div>
        <div className="w-[52px] px-5 fixed bottom-[160px] right-0 justify-end items-start gap-2 inline-flex">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openModalStoryAction()}
            className="grow shrink basis-0 h-[52px] p-3 bg-pink-300 rounded-full justify-center items-center gap-2 flex"
          >
            <IconStory />
          </motion.button>
        </div>
        <div className="w-full px-5 fixed bottom-[88px] left-0 justify-start items-start gap-2 inline-flex">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={shareLinkInviteFriends}
            className="grow shrink basis-0 h-[52px] p-4 bg-blue-300 rounded justify-center items-center gap-2 flex"
          >
            <div className="text-right text-neutral-900 text-sm font-bold font-['SF Pro Text'] leading-tight">
              Invite Frenz
            </div>
            <IconReferral />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => copyLink()}
            className="p-4 bg-blue-300 rounded justify-center items-center gap-1 flex"
          >
            <IconCopyOutline />
          </motion.button>
        </div>
        <div className="fixed bottom-0 left-0 w-full h-[90px] bg-black"></div>
      </div>
    </>
  )
}
