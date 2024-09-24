import { EndpointRoute, getFullApiUrl } from '@/utils/constants'
import axios from 'axios'

function headers(accessToken) {
  return {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }
}

// Define a function to fetch the user data
export const fetchUserData = async (accessToken) => {
  const response = await axios.get(
    getFullApiUrl(EndpointRoute.USERS_GET_USER),
    {
      headers: headers(accessToken),
    }
  )
  return response.data
}

export const fetchUserTasks = async (botId, accessToken) => {
  const fullApiUrl = `${getFullApiUrl(EndpointRoute.TASKS_GET_MY_TASKS)}?bot_id=${botId}`
  const response = await axios.get(fullApiUrl, {
    headers: headers(accessToken),
  })
  return response.data
}

export const updateClickTime = async (taskId, env, accessToken) => {
  const fullApiUrl = getFullApiUrl(EndpointRoute.USER_TASK_UPDATE_CLICK_TIME)
  const response = await axios.post(
    fullApiUrl,
    {
      task_id: taskId,
      env,
    },
    {
      headers: headers(accessToken),
    }
  )
  return response.data
}

export const updateProgressUserTask = async (
  taskId,
  env,
  accessToken,
  code = null,
  discordID = null,
  clickTime = null
) => {
  const fullApiUrl = getFullApiUrl(EndpointRoute.USER_TASK_UPDATE_PROGRESS)
  const response = await axios.post(
    fullApiUrl,
    {
      task_id: taskId,
      env,
      code,
      discord_id: discordID,
      click_time: clickTime,
    },
    {
      headers: headers(accessToken),
    }
  )
  return response.data
}

export const claimRewardUserTask = async (taskId, env, level, accessToken) => {
  const fullApiUrl = getFullApiUrl(EndpointRoute.USER_TASK_CLAIM_REWARD)
  const response = await axios.post(
    fullApiUrl,
    {
      task_id: taskId,
      env,
      level,
    },
    {
      headers: headers(accessToken),
    }
  )
  return response.data
}

export const fetchUserMyReferral = async (accessToken) => {
  const fullApiUrl = `${getFullApiUrl(EndpointRoute.USER_TASK_MY_REFERRAL)}`
  const response = await axios.get(fullApiUrl, {
    headers: headers(accessToken),
  })
  return response.data
}

export const fetchTelegramTaskLeaderboard = async (
  accessToken,
  numberOfTop
) => {
  const fullApiUrl = `${getFullApiUrl(EndpointRoute.TELEGRAM_TASK_LEADERBOARD)}?top=${numberOfTop}`
  const response = await axios.get(fullApiUrl, {
    headers: headers(accessToken),
  })
  return response.data
}

export const fetchMyRankLeaderboard = async (botId, accessToken) => {
  const fullApiUrl = `${getFullApiUrl(EndpointRoute.TELEGRAM_TASK_MY_RANK)}`
  const response = await axios.get(fullApiUrl, {
    headers: headers(accessToken),
  })
  return response.data
}

export const fetchUserInvitedList = async (botId, accessToken) => {
  return []
  const fullApiUrl = `${getFullApiUrl(EndpointRoute.TELEGRAM_TASK_USER_INVITE)}?bot_id=${botId}`
  const response = await axios.get(fullApiUrl, {
    headers: headers(accessToken),
  })
  return response.data
}

export const postUserInvite = async (referCode, botId, accessToken) => {
  const fullApiUrl = getFullApiUrl(EndpointRoute.TELEGRAM_TASK_USER_INVITE)
  const response = await axios.post(
    fullApiUrl,
    {
      code: referCode,
      bot_id: botId,
    },
    {
      headers: headers(accessToken),
    }
  )
  return response.data
}

export const postTaskCheckpoint = async (taskId, accessToken) => {
  const fullApiUrl = getFullApiUrl(EndpointRoute.TELEGRAM_TASK_CHECKPOINT)
  const response = await axios.post(
    fullApiUrl,
    {
      task_id: taskId,
    },
    {
      headers: headers(accessToken),
    }
  )
  return response.data
}

export const postTaskGetpoint = async (taskId, accessToken) => {
  const fullApiUrl = getFullApiUrl(EndpointRoute.TELEGRAM_TASK_GET_POINT)
  const response = await axios.post(
    fullApiUrl,
    {
      task_id: taskId,
    },
    {
      headers: headers(accessToken),
    }
  )
  return response.data
}

export const postUserAddPoint = async (point, accessToken) => {
  const fullApiUrl = getFullApiUrl(EndpointRoute.USER_TASK_ADD_POINT)
  const response = await axios.post(
    fullApiUrl,
    {
      point: point,
    },
    {
      headers: headers(accessToken),
    }
  )
  return response.data
}

export const postUserTaskClaimRefMonth = async (accessToken) => {
  const fullApiUrl = getFullApiUrl(EndpointRoute.USER_TASK_CLAIM_REF_MONTH)
  const response = await axios.post(
    fullApiUrl,
    {},
    {
      headers: headers(accessToken),
    }
  )
  return response.data
}

export const postWalletConnect = async (walletAddress, accessToken) => {
  const fullApiUrl = getFullApiUrl(EndpointRoute.WALLET_CONNECT)
  const response = await axios.post(
    fullApiUrl,
    {
      wallet_address: walletAddress,
    },
    {
      headers: headers(accessToken),
    }
  )
  return response.data
}

export const fetchSpin = async (botId, accessToken) => {
  return [
    {
      id: 9,
      name: '100x',
      icon: 'point',
      amount: 'x100',
      botId: 'aie_tma_dev_bot',
      status: 'open',
      quantity: 2,
      type: 'percent',
    },
    {
      id: 10,
      name: '50x',
      icon: 'point',
      amount: 'x50',
      botId: 'aie_tma_dev_bot',
      status: 'open',
      quantity: 4,
      type: 'percent',
    },
    {
      id: 11,
      name: '20x',
      icon: 'point',
      amount: 'x20',
      botId: 'aie_tma_dev_bot',
      status: 'open',
      quantity: 10,
      type: 'percent',
    },
    {
      id: 12,
      name: '10x',
      icon: 'point',
      amount: 'x10',
      botId: 'aie_tma_dev_bot',
      status: 'open',
      quantity: 20,
      type: 'percent',
    },
    {
      id: 13,
      name: '5x',
      icon: 'point',
      amount: 'x5',
      botId: 'aie_tma_dev_bot',
      status: 'open',
      quantity: 60,
      type: 'percent',
    },
    {
      id: 14,
      name: '2x',
      icon: 'point',
      amount: 'x2',
      botId: 'aie_tma_dev_bot',
      status: 'open',
      quantity: 120,
      type: 'percent',
    },
    {
      id: 15,
      name: '1.5x',
      icon: 'point',
      amount: 'x1.5',
      botId: 'aie_tma_dev_bot',
      status: 'open',
      quantity: 120,
      type: 'percent',
    },
    {
      id: 16,
      name: '1x',
      icon: 'point',
      amount: 'x1',
      botId: 'aie_tma_dev_bot',
      status: 'open',
      quantity: 350,
      type: 'percent',
    },
    {
      id: 17,
      name: '0.5x',
      icon: 'point',
      amount: 'x0.5',
      botId: 'aie_tma_dev_bot',
      status: 'open',
      quantity: 350,
      type: 'percent',
    },
    {
      id: 18,
      name: '0.1x',
      icon: 'point',
      amount: 'x0.1',
      botId: 'aie_tma_dev_bot',
      status: 'open',
      quantity: 100,
      type: 'percent',
    },
  ]
  const fullApiUrl = `${getFullApiUrl(EndpointRoute.TELEGRAM_SPIN)}?bot_id=${botId}`
  const response = await axios.get(fullApiUrl, {
    headers: headers(accessToken),
  })
  return response.data
}

export const spinPlay = async (botId, point, accessToken) => {
  const fullApiUrl = getFullApiUrl(EndpointRoute.TELEGRAM_SPIN_PLAY)
  //wait 3s
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return {
    isSuccess: true,
    message: '',
    data: {
      id: 17,
      cumulativePercentage: 0.893893893893894,
      percentage: 0.5005005005005005,
      name: '0.5x',
      icon: 'point',
      amount: 'x0.5',
      botId: 'NaviT2ETestBot',
      status: 'open',
      quantity: 500,
      type: 'percent',
      _point: -50,
      reward: 50,
    },
  }
  // const response = await axios.post(
  //   fullApiUrl,
  //   { bot_id: botId, point },
  //   {
  //     headers: headers(accessToken),
  //   }
  // )
  // return response.data
}

export const fetchSpinHistory = async (botId, accessToken) => {
  return [
    {
      id: 1172,
      telegramId: '568457336',
      botId: 'aie_tma_dev_bot',
      spinId: null,
      data: null,
      point: -100,
      reward: 150,
      spinParentId: null,
      playTxId: '618fa093-59da-4eb7-8781-abc7d0e8a05d',
      playTxHash: null,
      rewardTxId: null,
      rewardTxHash: null,
      status: 'Processing...',
      isSync: 0,
      timestamp: 1722739323158,
    },
  ]
  const fullApiUrl = `${getFullApiUrl(EndpointRoute.TELEGRAM_SPIN_HISTORY)}?bot_id=${botId}`
  const response = await axios.get(fullApiUrl, {
    headers: headers(accessToken),
  })
  return response.data
}
