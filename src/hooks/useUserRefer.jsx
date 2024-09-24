import { postUserInvite } from '@/apis/users'
import { BOT_ID, EndpointRoute } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'

const useUserRefer = (referCode, accessToken) => {
  return useQuery({
    queryKey: [
      'POST',
      EndpointRoute.TELEGRAM_TASK_USER_INVITE,
      referCode,
      BOT_ID,
      accessToken,
    ],
    queryFn: () => {
      return postUserInvite(referCode, BOT_ID, accessToken)
    },
    enabled: !!accessToken && !!referCode,
    retry: false,
    onError: (error) => {
      console.error('Error fetching user data:', error)
    },
  })
}

export default useUserRefer
