import IconCoin from '@/assets/imgs/common/icon-coin.png'
import IconDone from '@/assets/imgs/ic/done.svg'
import IconRight from '@/assets/imgs/ic/right.svg'
import { formatNumberWithLocale } from '@/utils/common'
import { motion } from 'framer-motion'

// example {
//   "current_level": 1,
//   "deep_link": "https://t.me/+FwilHuxYZJVlNTg1",
//   "description": "Subscribe to the channel Channel 2",
//   "env": "telegram",
//   "is_completed": true,
//   "level_status": [
//       {
//           "achievement": 1,
//           "claimed_status": true,
//           "claimed_time": 1724332081,
//           "completed_at": 1724331394,
//           "done_status": true,
//           "level": 1,
//           "reward": 1000
//       }
//   ],
//   "progress": 1,
//   "task_id": -1002158843882,
//   "telegram_id": 568457336
// }

export const TaskItem = ({ task, openModalTaskAction }) => {
  const {
    current_level,
    deep_link,
    description,
    env,
    is_completed,
    level_status,
    progress,
    task_id,
    telegram_id,
    img_url,
  } = task || {}
  const levelConfig = level_status.find((item) => item.level == current_level)
  const countUnclaimedDoneItems = level_status.reduce((count, item) => {
    if (item.done_status === true && item.claimed_status === false) {
      return count + 1 // Increment count for each matching item
    }
    return count // Return count unchanged if conditions are not met
  }, 0)
  const moreToClaim = countUnclaimedDoneItems > 1
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => openModalTaskAction(task)}
      className="w-full h-10 pl-3 pr-4 py-3 bg-white bg-opacity-10 rounded justify-start items-center gap-3 inline-flex cursor-pointer"
    >
      <img className="w-6 h-6" src={img_url} />
      <div className="grow shrink basis-0 flex-row justify-start items-center gap-1 inline-flex truncate">
        <div className="grow self-stretch justify-start items-center inline-flex">
          <div className="grow shrink basis-0 text-left text-white text-xs font-semibold font-['SF Pro Text'] leading-tight">
            {description}
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-2 justify-end items-center">
        <div className="self-stretch justify-start items-center gap-1 inline-flex">
          <div className="text-left text-orange-300 text-xs font-semibold font-['SF Pro Text'] leading-none">
            +{formatNumberWithLocale(levelConfig.reward)}
          </div>
          <img className="w-4 h-4" src={IconCoin} />
        </div>
        {(levelConfig.done_status && !levelConfig.claimed_status) ||
        moreToClaim ? (
          <div className="px-3 py-1 bg-blue-300 rounded-full">
            <div className="text-white text-xs font-semibold">Claim</div>
          </div>
        ) : (
          <img
            className="w-5 h-5 relative"
            src={is_completed ? IconDone : IconRight}
            alt={is_completed ? 'Claimed' : 'Right'}
          />
        )}
      </div>
    </motion.div>
  )
}
