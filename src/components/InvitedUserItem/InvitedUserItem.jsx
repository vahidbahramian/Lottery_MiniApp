import IconAvatar1 from '@/assets/imgs/avatar/img.png'
import DefaultAvatar from '@/assets/imgs/avatar/img.png'
import { FallbackImage } from '@/components/FallbackImage/FallbackImage.jsx'
import { formatDisplayNum } from '@/utils/common.jsx'

export const InvitedUserItem = ({ data }) => {
  const { telegramId, inviteId, avatar, name, point } = data || {}
  return (
    <div className="w-full self-stretch pl-3 pr-4 py-3 bg-white bg-opacity-10 rounded justify-start items-center gap-3 inline-flex">
      {/*<img className="w-12 h-12 rounded-full" src={avatar || IconAvatar1} />*/}
      <FallbackImage
        className="w-12 h-12 clip-path-circle rounded-full border-white border-opacity-10"
        src={avatar || DefaultAvatar}
        alt="avatar"
        fallbackSrc={DefaultAvatar}
      />
      <div className="grow shrink basis-0 flex-col justify-center items-start gap-1 inline-flex">
        <div className="self-stretch justify-start items-start inline-flex">
          <div className="grow shrink basis-0 text-left text-white text-sm font-semibold font-['SF Pro Text'] leading-tight">
            {name || inviteId}
          </div>
        </div>
        <div className="w-full h-4 text-left text-neutral-400 text-xs font-normal font-['SF Pro Text'] leading-none">
          {formatDisplayNum(point || 0)}
        </div>
      </div>
    </div>
  )
}
