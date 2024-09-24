import { fetchMyRankLeaderboard } from '@/apis/users'
import { BOT_ID, EndpointRoute } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'

const useLeaderboardMyRank = (accessToken) => {
  return useQuery({
    queryKey: [EndpointRoute.TELEGRAM_TASK_MY_RANK, accessToken],
    queryFn: () => {
      return fetchMyRankLeaderboard(BOT_ID, accessToken)
    },
    enabled: !!accessToken,
    retry: false,
    onError: (error) => {
      console.error('Error fetching leaderboard data:', error)
    },
  })
}

export default useLeaderboardMyRank
