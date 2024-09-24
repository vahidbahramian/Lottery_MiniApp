import BgSplash from '@/assets/imgs/common/bg-splash.webp'
import BackgroundImage from '../BackgroundImage/BackgroundImage'
import MemoIconX from '../Svg/IconX'
import MemoIconDiscord from '../Svg/IconDiscord'
import MemoIconTelegram from '../Svg/IconTelegram'
import { Link } from '../Link/Link'
import { useEffect, useState } from 'react'
import CircularLoading from '@/assets/lottie/circular-loading.json'
import Lottie from 'lottie-react'

const loadingDots = ['.', '..', '...']
export const SplashContainer = () => {
  const [currentDot, setCurrentDot] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDot((prev) => (prev + 1) % 3)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <BackgroundImage
      className="w-screen h-screen relative bg-black select-none"
      image={
        <img
          src={BgSplash}
          className="object-cover object-center w-full h-full"
          alt="bg-homepage"
        />
      }
    >
      <div className="w-full h-full justify-center items-center flex flex-col">
        <div className="w-full h-[107px] justify-center items-center gap-5 inline-flex mt-20">
          <Lottie
            height={120}
            width={120}
            animationData={CircularLoading}
            loop={true}
          />
        </div>
        <div className="text-center text-white text-[33px] font-normal font-['Poppins'] leading-10">
          Loading{loadingDots[currentDot]}
        </div>

        <div className="w-full text-center mt-[89px]">
          <div className="text-white text-5xl font-bold font-['Poppins'] leading-10">
            4am Labs
            <br />
          </div>
          <div className="text-white text-[33px] font-black font-['Poppins'] leading-10">
            <br />
          </div>
          <div className="text-white text-4xl font-light font-['Poppins'] leading-10">
            Stay Tuned
            <br />
          </div>
          <div className="text-white text-xl font-normal font-['Poppins'] leading-10">
            More Info in Official Channels
          </div>
          <div className="w-full items-center justify-center flex flex-row gap-5 mt-10">
            <Link to="https://t.me/Dane4am">
              <MemoIconX />
            </Link>
            <Link to="https://t.me/Dane4am">
              <MemoIconTelegram />
            </Link>
            <Link to="https://t.me/Dane4am" className="ml-2">
              <MemoIconDiscord />
            </Link>
          </div>
        </div>
      </div>
    </BackgroundImage>
  )
}
