import { fetchSpinHistory } from '@/apis/users'
// import { DUMMY_HISTORY } from '@/components/GamesContainer/Spin/utils'
import { BOT_ID, EndpointRoute } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'

// Create a custom hook to use the fetchUserData function
const useSpinHistory = (accessToken) => {
  return useQuery({
    queryKey: [EndpointRoute.TELEGRAM_SPIN_HISTORY, accessToken],
    queryFn: () => {
      return fetchSpinHistory(BOT_ID, accessToken)
    },
    enabled: !!accessToken,
    retry: false,
    onError: (error) => {
      console.error('Error fetching leaderboard data:', error)
    },
  })
}

export default useSpinHistory
