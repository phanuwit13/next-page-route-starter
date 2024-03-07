

import { AUTH_KEY } from '@/constants/auth'
import { getCookie } from 'cookies-next'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { useAuth } from '../store/auth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactNode | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const { loading, token } = useAuth()
  const router = useRouter()
  const pathName = usePathname()

  useEffect(
    () => {
      if (!pathName) {
        return
      }

      if (!getCookie(AUTH_KEY.AUTH_CREDENTIAL) || !getCookie(AUTH_KEY.USER_CREDENTIAL)) {
        if (pathName !== '/') {
          router.replace('/login')
        } else {
          router.replace('/login')
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, pathName]
  )

  if (loading || token === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard