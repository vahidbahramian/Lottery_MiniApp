import { fetchTelegramTaskLeaderboard } from '@/apis/users'
import { EndpointRoute } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'

// Create a custom hook to use the fetchUserData function
const useTelegramTaskLeaderboard = (accessToken, numberOfTop) => {
  return useQuery({
    queryKey: [EndpointRoute.TELEGRAM_TASK_LEADERBOARD, accessToken],
    queryFn: () => {
      return fetchTelegramTaskLeaderboard(accessToken, numberOfTop)
    },
    enabled: !!accessToken,
    retry: false,
    onError: (error) => {
      console.error('Error fetching leaderboard data:', error)
    },
  })
}

export default useTelegramTaskLeaderboard
