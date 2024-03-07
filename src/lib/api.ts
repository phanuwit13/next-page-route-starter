import { config } from '@/config/env'
import { AUTH_KEY } from '@/constants/auth'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { getCookie } from 'cookies-next'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { useAuth } from '@/store/auth'

const handleLogout = () => {
  return useAuth.getState().logout
}

const apiClient = axios.create({
  baseURL: config.apiEndpoint,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: Boolean(getCookie(AUTH_KEY.AUTH_CREDENTIAL))
      ? `Bearer ${getCookie(AUTH_KEY.AUTH_CREDENTIAL)}`
      : undefined,
  },
})

// Axios middleware to convert all api responses to camelCase
apiClient.interceptors.response.use(
  function (response) {
    if (
      response.data &&
      response.headers['content-type'] === 'application/json'
    ) {
      response.data = camelizeKeys(response.data)
    }

    return response
  },
  function (error) {
    if (
      error.response.status === 401 &&
      window.location.pathname !== '/login'
    ) {
      alert('User Expired')
      handleLogout()
      // handleOpenUnauthorized('User Expired')
      return
    }
    const res = error.response
    console.error('Looks like there was a problem. Status', res.status)
    return Promise.reject(error)
  }
)

// Axios middleware to convert all api requests to snake_case
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const newConfig = { ...config }
    newConfig.url = `${config.url}`

    if (newConfig.headers['Content-Type'] === 'multipart/form-data')
      return newConfig

    if (config.params) {
      newConfig.params = decamelizeKeys(config.params)
    }

    if (config.data) {
      newConfig.data = decamelizeKeys(config.data)
    }

    return newConfig
  }
)

export { apiClient }
