import { useCallback } from 'react'
import WebApp from '@twa-dev/sdk'
import { Link as RouterLink } from 'react-router-dom'

import './Link.css'

/**
 * @param {import('react-router-dom').LinkProps} props
 * @return {JSX.Element}
 */
export function Link({ className, onClick: propsOnClick, to, ...rest }) {
  const onClick = useCallback(
    (e) => {
      propsOnClick?.(e)

      // Compute if target path is external. In this case we would like to open link using
      // TMA method.
      let path
      if (typeof to === 'string') {
        path = to
      } else {
        const { search = '', pathname = '', hash = '' } = to
        path = `${pathname}?${search}#${hash}`
      }

      const targetUrl = new URL(path, window.location.toString())
      const currentUrl = new URL(window.location.toString())
      const isExternal =
        targetUrl.protocol !== currentUrl.protocol ||
        targetUrl.host !== currentUrl.host

      if (isExternal) {
        e.preventDefault()
        return WebApp.openLink(targetUrl.toString())
      }
    },
    [to, propsOnClick]
  )

  return (
    <RouterLink
      {...rest}
      to={to}
      onClick={onClick}
      className={[className, 'link'].filter(Boolean).join(' ')}
    />
  )
}
