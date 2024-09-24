export const STORAGE_KEY = {
  ACCESS_TOKEN: 'access_token',
  WALLET_ADDRESS: 'wallet_address',
  ROLE: 'role',
}

export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT
export const BOT_ID = import.meta.env.VITE_BOT_ID
export const WEBAPP_SHORT_NAME = import.meta.env.VITE_WEBAPP_SHORT_NAME
export const PREFIX_REFERRAL_CODE = import.meta.env.VITE_PREFIX_REFERRAL_CODE
export const DEV_IN_BROWSER_MODE =
  import.meta.env.VITE_DEV_IN_BROWSER_MODE === 'true'
export const INVITE_FRIENDS_URL = `https://t.me/${BOT_ID}/${WEBAPP_SHORT_NAME}?startapp=${PREFIX_REFERRAL_CODE || ''}`

export const TON_LOGO = 'https://ton.org/icons/custom/ton_logo.svg'
export const SINGLE_PAGE_TAB_IDS = {
  FRIENDS: 'friends',
  EARN: 'earn',
  PLAYGROUND: 'playground',
  LEADERBOARD: 'leaderboard',
}

export const SINGLE_PAGE_ALL_TABS = [
  SINGLE_PAGE_TAB_IDS.FRIENDS,
  SINGLE_PAGE_TAB_IDS.EARN,
  SINGLE_PAGE_TAB_IDS.PLAYGROUND,
  SINGLE_PAGE_TAB_IDS.LEADERBOARD,
]

export const PLAYGROUND_TAB_TASK_OPTIONS = {
  ALL_TASKS: 'all',
  TASK_SPIN: 'spin',
  TASK_TAP_TO_EARN: 'taptoearn',
}

export const PLAYGROUND_TAB_ALL_TASKS = [
  PLAYGROUND_TAB_TASK_OPTIONS.ALL_TASKS,
  PLAYGROUND_TAB_TASK_OPTIONS.TASK_SPIN,
  PLAYGROUND_TAB_TASK_OPTIONS.TASK_TAP_TO_EARN,
]

export const getFullApiUrl = (path) => `${API_ENDPOINT}${path}`

export class TaskType {
  static NORMAL = 'normal'
  static DAILY = 'daily'
  static PARTNER = 'partner'
}

export class QuestType {
  static SOCIAL = 'social'
  static REF = 'ref'
  static LOGIN = 'login'
}

export class RefTaskSubType {
  static INVITE_FRIENDS = 'invite_friends'
  static CLAIM_FRIENDS_PROFIT = 'claim_friends_profit'
}

export class LoginTaskSubType {
  static LOGIN_COUNT = 'login_count'
  static CONSECUTIVE_LOGIN = 'consecutive_login'
}

export class SocialTaskSubType {
  static WATCH_YOUTUBE = 'watch_youtube_video_with_code'
}

export class TaskStatus {
  static INIT = 'init'
  static PENDING = 'pending'
  static SUCCESS = 'success'
  static FAIL = 'fail'
  static CLAIMED = 'claimed'
}

export const EndpointRoute = {
  AUTH_VERIFY: '/auth/verify',
  USERS_GET_USER: '/users/get_user',

  TASKS_GET_MY_TASKS: '/tasks/my_tasks',
  USER_TASK_UPDATE_PROGRESS: '/user_task/update-progress',
  USER_TASK_CLAIM_REWARD: '/user_task/claim_reward',
  USER_TASK_MARK_FINISH_TASK: '/user_task/mark_finish_task',
  USER_TASK_UPDATE_CLICK_TIME: '/user_task/update_click_time',

  TELEGRAM_TASK_USER: '/telegram-task/user',
  TELEGRAM_TASK_USER_INVITE: '/telegram-task/user-invite',
  TELEGRAM_TASK_CHECKPOINT: '/telegram-task/checkpoint',
  TELEGRAM_TASK_GET_POINT: '/telegram-task/get-point',
  TELEGRAM_SPIN: '/telegram-task/spin',
  TELEGRAM_SPIN_PLAY: '/telegram-task/spin-play',
  TELEGRAM_SPIN_HISTORY: '/telegram-task/spin-history',

  TELEGRAM_TASK_LEADERBOARD: '/statistic/leaderboard',
  TELEGRAM_TASK_MY_RANK: '/statistic/myrank',

  USER_TASK_ADD_POINT: '/user_task/add_point',
  USER_TASK_MY_REFERRAL: '/user_task/myreferral',
  USER_TASK_CLAIM_REF_MONTH: '/user_task/claim_ref_month',

  WALLET_CONNECT: '/wallet/connect',
}
