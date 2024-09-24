import { postUserAddPoint } from '@/apis/users'
import { EndpointRoute } from '@/utils/constants'
import { useMutation } from '@tanstack/react-query'

const useUserAddPoint = (accessToken, cbError) => {
  return useMutation({
    mutationKey: [EndpointRoute.USER_TASK_ADD_POINT, accessToken],
    mutationFn: ({ point }) => {
      return postUserAddPoint(point, accessToken)
    },
    retry: false,
    onError: (error) => {
      console.error('Error get point', error)
      if (cbError) cbError()
    },
  })
}

export default useUserAddPoint
