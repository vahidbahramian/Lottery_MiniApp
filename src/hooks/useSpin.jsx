import { fetchSpin, fetchUserInvitedList } from '@/apis/users'
import { BOT_ID, EndpointRoute } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'

// Create a custom hook to use the fetchUserData function
const useSpin = (accessToken) => {
  return useQuery({
    queryKey: ['GET', EndpointRoute.TELEGRAM_SPIN, BOT_ID, accessToken],
    queryFn: () => {
      return fetchSpin(BOT_ID, accessToken)
    },
    enabled: !!accessToken, // Only run the query if the accessToken is provided
    retry: false, // You can set this to true or false based on your needs
    onError: (error) => {
      console.error('Error fetching user data:', error)
    },
  })
}

export default useSpin
