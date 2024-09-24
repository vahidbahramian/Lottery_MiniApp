import { TaskStatus } from '@/utils/constants'

export const sortTasks = (tasks) => {
  if (!tasks) {
    return tasks
  }
  return tasks.sort((a, b) => {
    if (
      (a.status === TaskStatus.CLAIMED && b.status !== TaskStatus.CLAIMED) ||
      (b.status === TaskStatus.CLAIMED && a.status !== TaskStatus.CLAIMED)
    ) {
      return a.status === TaskStatus.CLAIMED ? 1 : -1
    }
    if (a.point < b.point) {
      return 1
    }
    if (a.point > b.point) {
      return -1
    }
    return 0
  })
}
