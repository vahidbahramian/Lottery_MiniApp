import { postTaskGetpoint } from '@/apis/users'
import { EndpointRoute } from '@/utils/constants'
import { useMutation } from '@tanstack/react-query'

const useTaskGetPoint = (taskId, accessToken, cbSuccess, cbError) => {
  return useMutation({
    mutationKey: [EndpointRoute.TELEGRAM_TASK_GET_POINT, taskId, accessToken],
    mutationFn: () => {
      return postTaskGetpoint(taskId, accessToken)
    },
    retry: false,
    onError: (error) => {
      console.error('Error get point', error)
      if (cbError) cbError()
    },
    onSuccess: (data) => {
      if (cbSuccess) cbSuccess(data)
    },
  })
}

export default useTaskGetPoint
