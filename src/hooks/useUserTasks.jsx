import { fetchUserTasks } from '@/apis/users'
import { BOT_ID, EndpointRoute } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'

// Create a custom hook to use the fetchUserData function
const useUserTasks = (accessToken) => {
  return useQuery({
    queryKey: [EndpointRoute.TASKS_GET_MY_TASKS, accessToken],
    queryFn: () => {
      return fetchUserTasks(BOT_ID, accessToken)
    },
    enabled: !!accessToken, // Only run the query if the accessToken is provided
    retry: false, // You can set this to true or false based on your needs
    onError: (error) => {
      console.error('Error fetching user data:', error)
    },
  })
}

export default useUserTasks
