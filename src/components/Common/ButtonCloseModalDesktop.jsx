import XMark from '../Svg/XMark'

export const ButtonCloseModalDesktop = ({ onClose }) => {
  return (
    <button
      id="btn-close-modal-desktop"
      className="hidden lg:block lg:fixed bg-[#1B2036] w-12 h-12 z-[1400] p-3 rounded-full right-8 top-8"
      onClick={onClose}
      title={'Close'}
    >
      <XMark fill="#FFF" />
    </button>
  )
}
