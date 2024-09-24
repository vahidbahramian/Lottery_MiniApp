import { EndpointRoute } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '@/apis/users.jsx'

const useCategory = (accessToken) => {
  return useQuery({
    queryKey: [EndpointRoute.CATEGORIES, accessToken],
    queryFn: () => {
      return fetchCategories(accessToken)
    },
    enabled: !!accessToken,
    retry: false,
    onError: (error) => {
      console.error('Error fetching category:', error)
    },
  })
}

export default useCategory
