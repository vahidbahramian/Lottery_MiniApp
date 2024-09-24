import { postTaskCheckpoint } from '@/apis/users'
import { EndpointRoute } from '@/utils/constants'
import { useMutation } from '@tanstack/react-query'

const useTaskCheckpoint = (taskId, accessToken, cbSuccess, cbError) => {
  return useMutation({
    mutationKey: [EndpointRoute.TELEGRAM_TASK_CHECKPOINT, taskId, accessToken],
    mutationFn: () => {
      return postTaskCheckpoint(taskId, accessToken)
    },
    retry: false,
    onError: (error) => {
      console.error('Error task checkpoint:', error)
      if (cbError) cbError()
    },
    onSuccess: (data) => {
      if (cbSuccess) cbSuccess(data)
    },
  })
}

export default useTaskCheckpoint
