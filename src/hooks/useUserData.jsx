import { fetchUserData } from '@/apis/users'
import { EndpointRoute } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'

const useUserData = (accessToken) => {
  return useQuery({
    queryKey: [EndpointRoute.USERS_GET_USER, accessToken],
    queryFn: () => {
      return fetchUserData(accessToken)
    },
    enabled: !!accessToken,
    retry: false,
    onError: (error) => {
      console.error('Error fetching user data:', error)
    },
  })
}

export default useUserData
