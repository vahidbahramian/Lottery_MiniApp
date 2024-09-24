import { updateProgressUserTask } from '@/apis/users'
import { EndpointRoute } from '@/utils/constants'
import { useMutation } from '@tanstack/react-query'

const useUpdateProgressTask = (
  taskId,
  env,
  accessToken,
  clickTime,
  cbSuccess,
  cbError
) => {
  return useMutation({
    mutationKey: [
      EndpointRoute.USER_TASK_UPDATE_PROGRESS,
      taskId,
      env,
      accessToken,
    ],
    mutationFn: ({ socialCode = null, discordID = null } = {}) => {
      return updateProgressUserTask(
        taskId,
        env,
        accessToken,
        socialCode,
        discordID,
        clickTime
      )
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

export default useUpdateProgressTask
