import clsx from 'clsx'
import XMark from '../Svg/XMark'

export const ButtonCloseModalMobile = ({ onClose, containerStyles }) => {
  return (
    <div
      className={clsx(
        'absolute flex lg:hidden flex-row items-center justify-center w-full -top-16 left-0',
        containerStyles
      )}
    >
      <button
        id="btn-close-modal-mobile"
        className="bg-[#1B2036] gap-2.5 w-12 h-12 z-[1400] p-3 rounded-[48px]"
        onClick={onClose}
        title={'Close'}
      >
        <XMark fill="#FFF" />
      </button>
    </div>
  )
}
