import { TonConnectUIProvider } from '@tonconnect/ui-react'
import WebApp from '@twa-dev/sdk'
import { useEffect, useMemo } from 'react'

import { App } from '@/components/App.jsx'
import { ErrorBoundary } from '@/components/ErrorBoundary.jsx'
import { ErrorBoundaryError } from '@/components/ErrorBoundaryError.jsx'
import { AuthProvider } from '@/contexts/authContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { STORAGE_KEY } from '@/utils/constants.jsx'

const queryClient = new QueryClient()

/**
 * @returns {JSX.Element}
 */
export function Inner() {
  localStorage.clear(STORAGE_KEY.WALLET_ADDRESS)
  localStorage.clear(STORAGE_KEY.ACCESS_TOKEN)
  const debug = WebApp.initDataUnsafe.start_param === 'debug'
  const inviteTma = WebApp.initDataUnsafe.start_param
  // console.log({ inviteTma })
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString()
  }, [])

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import('eruda').then((lib) => lib.default.init())
    }
  }, [debug])

  return (
    <QueryClientProvider client={queryClient}>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <AuthProvider inviteTma={inviteTma}>
          <App />
        </AuthProvider>
      </TonConnectUIProvider>
    </QueryClientProvider>
  )
}

/**
 * @returns {JSX.Element}
 */
export function Root() {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <Inner />
    </ErrorBoundary>
  )
}
