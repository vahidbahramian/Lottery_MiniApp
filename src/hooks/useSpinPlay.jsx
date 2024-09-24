import { spinPlay } from '@/apis/users'
import { BOT_ID, EndpointRoute } from '@/utils/constants'
import { useMutation } from '@tanstack/react-query'

const useSpinPlay = (point, accessToken, cbSuccess, cbError) => {
  return useMutation({
    mutationKey: [EndpointRoute.TELEGRAM_SPIN_PLAY, BOT_ID, point, accessToken],
    mutationFn: () => {
      return spinPlay(BOT_ID, point, accessToken)
    },
    retry: false,
    onError: (error) => {
      console.error('Error play spin', error)
      if (cbError) cbError()
    },
    onSuccess: (data) => {
      if (cbSuccess) cbSuccess(data)
    },
  })
}

export default useSpinPlay
