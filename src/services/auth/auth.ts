import { apiClient } from '@/lib/api'
import { FormRequestLogin, LoginResponse } from '@/services/auth/auth.type'
import { useMutation } from '@tanstack/react-query'

export const useLogin = () => {
  return useMutation({
    mutationKey: ['get-login'],
    mutationFn: ({ username, password }: FormRequestLogin) =>
      apiClient.post<LoginResponse>(`/auth/login`, {
        username: username,
        password: password,
      }),
  })
}
