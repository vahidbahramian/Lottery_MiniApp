import { AppRoot } from '@telegram-apps/telegram-ui'
import WebApp from '@twa-dev/sdk'
import { useEffect, useState, useRef } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { useAuth } from '@/contexts/authContext'
import useUserRefer from '@/hooks/useUserRefer'
import { routes } from '@/navigation/routes.jsx'
import { DEV_IN_BROWSER_MODE, PREFIX_REFERRAL_CODE } from '@/utils/constants'
import { initClosingBehavior } from '@telegram-apps/sdk'
import { DEV_INIT_DATA } from '@/contexts/dummyInitData'

let globalHistory = []

function BackButtonManipulator() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (DEV_IN_BROWSER_MODE) {
      return
    }
    if (globalHistory[globalHistory.length - 1] !== location.search) {
      globalHistory.push(location.search)
    }

    function handleBackClick() {
      if (
        WebApp.isVersionAtLeast('6.1') &&
        WebApp.BottomSheet &&
        WebApp.BottomSheet.isExpanded
      ) {
        WebApp.BottomSheet.close()
      } else if (globalHistory.length <= 1) {
        WebApp.close()
      } else {
        globalHistory.pop()
        const previousSearch = globalHistory[globalHistory.length - 1] || ''
        navigate({ search: previousSearch })
      }
    }

    if (globalHistory.length <= 1) {
      WebApp.BackButton.hide()
    } else {
      WebApp.BackButton.show()
    }

    WebApp.BackButton.onClick(handleBackClick)

    return () => {
      WebApp.BackButton.offClick(handleBackClick)
    }
  }, [navigate, location])

  return null
}

function AppContent() {
  const location = useLocation()
  const { accessToken, login } = useAuth()
  const [referCode, setReferCode] = useState(null)
  const { data: resultRefer, isFetching } = useUserRefer(referCode, accessToken)
  const initDataRaw = WebApp.initData
  const initData = WebApp.initDataUnsafe

  useEffect(() => {
    let _initDataRaw = initDataRaw
    if (DEV_IN_BROWSER_MODE) {
      _initDataRaw = DEV_INIT_DATA
    }
    if (!accessToken) {
      login(_initDataRaw)
    }
    const { start_param } = initData || {}
    if (start_param?.indexOf(PREFIX_REFERRAL_CODE) === 0) {
      const code = start_param.split(PREFIX_REFERRAL_CODE)[1]
      setReferCode(code)
    }
  }, [initDataRaw, initData])

  return (
    <AppRoot
      key={location.pathname + location.search}
      appearance={'dark'}
      platform={['macos', 'ios'].includes(WebApp.platform) ? 'ios' : 'base'}
    >
      <BackButtonManipulator />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppRoot>
  )
}

export function App() {
  useEffect(() => {
    try {
      const mode = DEV_IN_BROWSER_MODE
      if (mode) {
        console.log('DEV__IN_BROWSER_MODE', mode)
        return
      }
      const [closingBehavior] = initClosingBehavior()
      closingBehavior.enableConfirmation()
      console.log(
        'closingBehavior_isConfirmationNeeded',
        closingBehavior.isConfirmationNeeded
      )
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
