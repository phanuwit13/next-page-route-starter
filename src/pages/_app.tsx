import AuthGuard from '@/auth/AuthGuard'
import AuthProvider from '@/auth/AuthProvider'
import GuestGuard from '@/auth/GuestGuard'
import PermissionProvider from '@/auth/PermissionProvider'
import SpinnerPage from '@/components/SpinnerPage'
import '@/styles/globals.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
  guard?: Guard
  permission?: string[]
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

type GuardProps = {
  guard: Guard
  children: ReactNode
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: 0,
    },
  },
})

export const Guard = ({ children, guard }: GuardProps) => {
  if (guard === 'Guest')
    return <GuestGuard fallback={<SpinnerPage />}>{children}</GuestGuard>
  if (guard === 'Auth')
    return <AuthGuard fallback={<SpinnerPage />}>{children}</AuthGuard>

  return children
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  const guard = Component.guard ?? 'All'

  const permission = Component.permission ?? []

  return (
    <>
      <AuthProvider checkAuth={guard === 'Auth'}>
        <QueryClientProvider client={queryClient}>
          <Guard guard={guard}>
            <PermissionProvider permission={permission}>
              {getLayout(<Component {...pageProps} />)}
            </PermissionProvider>
          </Guard>
        </QueryClientProvider>
      </AuthProvider>
    </>
  )
}

export default App
