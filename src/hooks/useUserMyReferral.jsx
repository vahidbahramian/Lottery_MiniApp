import { fetchUserMyReferral } from '@/apis/users'
import { EndpointRoute } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'

// Create a custom hook to use the fetchUserMyReferral function
const useUserMyReferral = (accessToken) => {
  return useQuery({
    queryKey: [EndpointRoute.USER_TASK_MY_REFERRAL, accessToken],
    queryFn: () => {
      return fetchUserMyReferral(accessToken)
    },
    enabled: !!accessToken, // Only run the query if the accessToken is provided
    retry: false, // You can set this to true or false based on your needs
    onError: (error) => {
      console.error('Error fetching referral list of user:', error)
    },
  })
}

export default useUserMyReferral
