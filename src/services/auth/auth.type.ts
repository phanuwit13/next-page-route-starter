export interface FormRequestLogin {
  username: string
  password: string
}

export interface LoginResponse {
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
}
