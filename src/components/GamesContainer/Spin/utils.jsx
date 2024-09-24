import IconCoinPng from '@/assets/imgs/common/icon-coin.png'
import IconUsdt from '@/components/Svg/IconUsdt'

export const MIN_BET_VALUE = 100
export const MAX_BET_VALUE = 100000

export const BetOptionIds = {
  BET_100: 1,
  BET_500: 2,
  BET_1000: 3,
  BET_CUSTOM: 4,
}

export const BetOptions = [
  {
    id: BetOptionIds.BET_100,
    value: 100,
  },
  {
    id: BetOptionIds.BET_500,
    value: 500,
  },
  {
    id: BetOptionIds.BET_1000,
    value: 1000,
  },
]

export const getBetOption = (betOptionId) => {
  return BetOptions.find((option) => option.id === betOptionId)
}

export const getPrizeIcon = (prizeIcon) => {
  switch (prizeIcon) {
    case 'usdt':
      return <IconUsdt className="size-8" />
    case 'point':
    case 'good_luck':
      return <img src={IconCoinPng} className="size-8" />
  }
}

export const DUMMY_HISTORY = [
  {
    id: 17,
    cumulativePercentage: 0.4388408569300801,
    percentage: 0.38073597787467084,
    name: '0.5x',
    icon: 'point',
    amount: 'x0',
    botId: 'aie_tma_dev_bot',
    status: 'open',
    quantity: 250000,
    type: 'percent',
    _point: -100,
  },
  {
    id: 18,
    cumulativePercentage: 1,
    percentage: 0.5611591430699199,
    name: '0.1x',
    icon: 'point',
    amount: 'x0',
    botId: 'aie_tma_dev_bot',
    status: 'open',
    quantity: 368470,
    type: 'percent',
    _point: -100,
  },
]
