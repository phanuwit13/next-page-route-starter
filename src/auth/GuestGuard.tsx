
import { AUTH_KEY } from '@/constants/auth'
import { getCookie } from 'cookies-next'
import { usePathname, useRouter } from 'next/navigation'
import { ReactElement, ReactNode, useEffect } from 'react'
import { useAuth } from '../store/auth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const { token, loading } = useAuth()
  const router = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    if (!pathName) {
      return
    }

    if (getCookie(AUTH_KEY.AUTH_CREDENTIAL) && getCookie(AUTH_KEY.USER_CREDENTIAL)) {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, pathName])

  if (loading || (!loading && token !== null)) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
