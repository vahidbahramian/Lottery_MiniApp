import { claimRewardUserTask } from '@/apis/users'
import { EndpointRoute } from '@/utils/constants'
import { useMutation } from '@tanstack/react-query'

const useClaimRewardTask = (
  taskId,
  env,
  level,
  accessToken,
  cbSuccess,
  cbError
) => {
  return useMutation({
    mutationKey: [
      EndpointRoute.USER_TASK_CLAIM_REWARD,
      taskId,
      env,
      level,
      accessToken,
    ],
    mutationFn: ({ customLevel = null } = {}) => {
      const finalLevel = customLevel != null ? customLevel : level
      return claimRewardUserTask(taskId, env, finalLevel, accessToken)
    },
    retry: false,
    onError: (error) => {
      console.error('Error task claim reward:', error)
      cbError && cbError()
    },
    onSuccess: (data) => {
      cbSuccess && cbSuccess(data)
    },
  })
}

export default useClaimRewardTask
