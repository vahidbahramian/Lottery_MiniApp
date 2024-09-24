import { initUtils } from '@telegram-apps/sdk'
import { INVITE_FRIENDS_URL } from './constants'

export function formatCountdownTime(timestamp) {
  // Convert the timestamp to milliseconds
  let date = new Date(timestamp * 1000)

  // Extract hours, minutes, and seconds
  let hours = date.getUTCHours()
  let minutes = date.getUTCMinutes()
  let seconds = date.getUTCSeconds()

  // Format hours, minutes, and seconds with leading zeros
  let formattedTime = [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':')

  return formattedTime
}

export const copyToClipBoard = (text) => {
  const dummyTextarea = document.createElement('textarea')
  dummyTextarea.value = text

  dummyTextarea.style.position = 'fixed'
  dummyTextarea.style.opacity = '0'

  document.body.appendChild(dummyTextarea)

  dummyTextarea.select()
  dummyTextarea.setSelectionRange(0, 99999)

  try {
    const successful = document.execCommand('copy')
    if (successful) {
      console.log('Copied')
    } else {
      console.log('cant copy')
    }
  } catch (err) {
    console.error('cant copy', err)
  }

  document.body.removeChild(dummyTextarea)
}

export const formatNumberWithLocale = (number) => {
  if (isNaN(number)) {
    return number
  }
  return number.toLocaleString()
}

export function formatWalletAddress(address) {
  if (!address || !address.startsWith('0x')) {
    return address
  }

  // Extract and format segments
  const prefix = address.slice(0, 4) // "0x1a"
  const suffix = address.slice(-4) // "3c4d"
  const ellipsis = '...'

  return `${prefix}${ellipsis}${suffix}`
}

export function replaceAllQuotes(inputString, replacement = '') {
  // Check if replaceAll() is available (modern browsers)
  if (typeof inputString.replaceAll === 'function') {
    return inputString.replaceAll('"', replacement)
  } else {
    // Fallback for older environments (e.g., IE) using regular expressions
    return inputString.replace(/"/g, replacement)
  }
}

export const shortenDisplayText = (name, max = 8) => {
  if (name?.length > max) {
    name = name.substring(0, max - 3) + '...'
  }
  return name
}

export const formatDisplayNum = (
  num,
  locale = 'en',
  noFractionDigits = false,
  fractionDigits = 3,
  maxZeroFractionDigits = 4
) => {
  if (isNaN(num)) {
    return num
  }
  const prefix = Number(num) >= 0 ? '' : '-'
  num = Math.abs(num)

  if (num > 1e12) {
    const formatter = new Intl.NumberFormat(locale, {
      notation: 'compact',
      maximumFractionDigits: fractionDigits,
    })
    return `${prefix}${formatter.format(num.toFixed(fractionDigits))}`
  }

  if (num < 0.099 && num > 0) {
    if (num < Number(`1e-${maxZeroFractionDigits}`)) {
      let numStr = num.toString()
      if (numStr?.indexOf('e') > -1) {
        const parts = numStr.split('e')
        numStr = `0.${'0'.repeat(
          Math.abs(parts[1]) - 1
        )}${parts[0].replace('.', '')}`
      }
      const parts = numStr.split('.')
      const integerStr = parts[0]

      let decimalStr = parts[1]

      const zeroCount = (decimalStr?.match(/^0+/)?.[0]?.length || 0).toString()

      decimalStr = Number(decimalStr).toString()
      while (decimalStr?.length < fractionDigits) {
        decimalStr += '0'
      }
      if (decimalStr?.length > fractionDigits) {
        decimalStr = Number(`0.${decimalStr}`)
          .toFixed(fractionDigits + 1)
          .split('.')[1]
      }

      return `${integerStr}.0${convertNumToSubscriptStr(
        zeroCount
      )}${Number(decimalStr)}`
    }
    const expo = Number.parseFloat(num).toExponential(1).split('e')[1]
    return Number(num).toFixed(Math.abs(expo) + fractionDigits)
  } else {
    let minimumFractionDigits = num % 1 == 0 ? 0 : fractionDigits
    let formatter = Intl.NumberFormat(locale, {
      notation: 'compact',
      minimumFractionDigits: noFractionDigits
        ? undefined
        : minimumFractionDigits,
    })
    return `${prefix}${formatter.format(Number(num).toFixed(3))}`
  }
}

export function capitalizeFirstLetter(string) {
  if (!string) {
    return string
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const openExternalLink = (url) => {
  try {
    const sdkUtils = initUtils()
    sdkUtils.openLink(url)
  } catch (error) {
    console.error('Error opening link:', error)
    window.open(url, '_blank')
  }
}

export const shareInviteUrl = (code) => {
  const shareUrl = `${INVITE_FRIENDS_URL}${code}`

  try {
    const sdkUtils = initUtils()
    sdkUtils.shareURL(
      shareUrl,
      '\n🎁 Share the excitement of 4am with your friends and earn rewards together! Use the link above to invite friends to join our world 🎆'
    )
  } catch (error) {
    window.open(shareUrl, '_blank')
  }
}

export const numberWithCommas = (x, isHaveTailZero = false) => {
  if (isNaN(x)) {
    return x
  }
  let result = x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  if (isHaveTailZero && x <= 1000) {
    return `${result}.00`
  } else {
    return result
  }
}

export const formatPointNum = (point, locale) => {
  //check greater than 100k
  if (point > 100 * 1000) {
    return formatDisplayNum(point, locale, true)
  } else {
    return numberWithCommas(point)
  }
}
