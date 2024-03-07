import { AUTH_KEY } from '@/constants/auth'
import { apiClient } from '@/lib/api'
import { deleteCookie, setCookie } from 'cookies-next'
import dayjs from 'dayjs'
import { create } from 'zustand'
import { logger } from './log'

type LoginData = {
  user: User
  token: string
  remember?: boolean
  redirectUri?: string
}

type UseAuth = {
  user: null | User
  loading: boolean
  token: string | null

  login: (data: LoginData) => void
  logout: (data?: { redirectUri?: string }) => void
  setLoading: (value: boolean) => void
}

type User = {
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  permission: string[]
}

const initialState = {
  user: null,
  loading: false,
  token: null,
}

const setAuthCookie = (key: string, value: string, expires?: number) => {
  setCookie(
    key,
    value,
    expires ? { expires: dayjs().add(expires, 'day').toDate() } : undefined
  )
}

export const useAuth = create<UseAuth>()(
  logger(
    (set) => ({
      ...initialState,
      login: ({ token, redirectUri, remember, user }) => {
        //set token to cookie
        setAuthCookie(
          AUTH_KEY.AUTH_CREDENTIAL,
          token,
          remember ? AUTH_KEY.AUTH_CREDENTIAL_EXPIRE : undefined
        )
        //set user to cookie
        setAuthCookie(
          AUTH_KEY.USER_CREDENTIAL,
          JSON.stringify(user),
          remember ? AUTH_KEY.AUTH_CREDENTIAL_EXPIRE : undefined
        )

        // set token and user to store (zustand)
        set({ user: user, loading: false, token: token })

        //redirect path
        if (redirectUri) {
          window.location.href = redirectUri
        }
      },
      logout: ({ redirectUri } = {}) => {
        set({ user: null, token: null })
        //delete cookie
        deleteCookie(AUTH_KEY.AUTH_CREDENTIAL)
        deleteCookie(AUTH_KEY.USER_CREDENTIAL)
        //clear api config request
        apiClient.interceptors.request.clear()
        window.location.href = redirectUri || '/login'
      },
      setLoading: (value) => {
        set({ loading: value })
      },
    }),
    'auth-store'
  )
)
