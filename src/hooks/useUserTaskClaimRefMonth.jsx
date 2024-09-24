import { postUserTaskClaimRefMonth } from '@/apis/users'
import { EndpointRoute } from '@/utils/constants'
import { useMutation } from '@tanstack/react-query'

const useUserTaskClaimRefMonth = (accessToken, cbError, cbSuccess) => {
  return useMutation({
    mutationKey: [EndpointRoute.USER_TASK_CLAIM_REF_MONTH, accessToken],
    mutationFn: () => {
      return postUserTaskClaimRefMonth(accessToken)
    },
    retry: false,
    onError: (error) => {
      console.error('Error Claim Refferal Point', error)
      if (cbError) cbError()
    },
    onSuccess: (data) => {
      if (cbSuccess) cbSuccess(data)
    },
  })
}

export default useUserTaskClaimRefMonth
