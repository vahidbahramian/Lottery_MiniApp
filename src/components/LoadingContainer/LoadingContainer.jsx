import CircularLoading from '@/assets/lottie/circular-loading.json'
import clsx from 'clsx'
import Lottie from 'lottie-react'

export const LoadingContainer = ({ className }) => (
  <div
    className={clsx('w-full flex justify-center items-center', className)}
    style={{ backgroundColor: '#000', zIndex: 9999 }}
  >
    <div>
      <Lottie animationData={CircularLoading} loop={true} />
    </div>
  </div>
)
