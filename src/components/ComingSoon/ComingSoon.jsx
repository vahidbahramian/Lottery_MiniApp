import IconBrand from '@/assets/imgs/common/4am-logo.png'

const ComingSoon = () => (
  <div className="w-full h-[calc(100vh_-_5rem)] justify-center items-center flex flex-col gap-3">
    <img className="w-32 h-24" src={IconBrand} />
    <div className="w-full text-center text-white text-5xl font-medium font-['SF Pro Text']">
      This feature is coming soon!!!
    </div>
    <div className="w-full text-center text-orange-300 text-xl font-normal font-['SF Pro Text']">
      Stay tuned for something amazing
    </div>
  </div>
)

export { ComingSoon }
