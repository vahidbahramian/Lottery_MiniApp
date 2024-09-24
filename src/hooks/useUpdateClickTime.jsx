import { updateClickTime } from '@/apis/users'
import { EndpointRoute } from '@/utils/constants'
import { useMutation } from '@tanstack/react-query'

const useUpdateClickTime = (taskId, env, accessToken, cbSuccess, cbError) => {
  return useMutation({
    mutationKey: [
      EndpointRoute.USER_TASK_UPDATE_CLICK_TIME,
      taskId,
      env,
      accessToken,
    ],
    mutationFn: () => {
      return updateClickTime(taskId, env, accessToken)
    },
    retry: false,
    onError: (error) => {
      console.error('Error update click time:', error)
      if (cbError) cbError()
    },
    onSuccess: (data) => {
      if (cbSuccess) cbSuccess(data)
    },
  })
}

export default useUpdateClickTime
