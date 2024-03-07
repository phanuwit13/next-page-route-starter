

// ** React Imports
import { ReactNode, useEffect } from 'react'

import { AUTH_KEY } from '@/constants/auth'
import { getCookie } from 'cookies-next'
import { useAuth } from '../store/auth'

type Props = {
  children: ReactNode
  checkAuth: boolean
}

const AuthProvider = ({ children, checkAuth }: Props) => {
  // ** States
  const { login, logout } = useAuth()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = getCookie(AUTH_KEY.AUTH_CREDENTIAL)
      const storedUser = getCookie(AUTH_KEY.USER_CREDENTIAL)
      if (storedToken && storedUser) {
        login({
          user: JSON.parse(storedUser),
          token: storedToken,
          remember: true,
        })
      } else if (checkAuth) {
        console.log('check auth')
        logout()
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}

export default AuthProvider
