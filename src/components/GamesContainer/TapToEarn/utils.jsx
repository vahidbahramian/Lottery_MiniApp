import { postEvent } from '@telegram-apps/sdk'

export const generateFlyingPoint = (value, containerRef, touchEvent) => {
  const containerRect = containerRef.current.getBoundingClientRect()
  // Calculate the position relative to the container
  const touch = touchEvent.touches[0]

  const x = touch.clientX - containerRect.left
  const y = touch.clientY - containerRect.top

  const newDiv = document.createElement('div')
  newDiv.textContent = `+${value}`
  newDiv.className = `text-3xl font-bold text-white absolute pointer-events-none`
  newDiv.style.left = `${x}px`
  newDiv.style.top = `${y}px`
  newDiv.style.transform = 'translate(-50%, -50%)'
  newDiv.style.animation = 'floatUp 2s ease-in-out'

  // Append the new "+1" element
  containerRef.current.appendChild(newDiv)
  setTimeout(() => {
    if (containerRef.current !== null) {
      containerRef.current.removeChild(newDiv)
    }
  }, 2000) // 2 second for the animation duration
}

export const triggerHapticFeedback = (
  type = 'impact',
  impact_style = 'heavy'
) => {
  try {
    postEvent('web_app_trigger_haptic_feedback', {
      type: type,
      impact_style: impact_style,
    })
    // eslint-disable-next-line no-empty
  } catch (error) {}
}
