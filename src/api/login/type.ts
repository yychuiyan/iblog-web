export interface UserLoginType {
  msg?: string
  avatar?: string
  email?: string
  code?: number | string
  password?: string
  username?: string
  verifyPassword?: string
  token?: string
  grant_type?: string
  client_id?: string
  client_secret?: string
  redirect_uri?: string
  clientId?: string
  clientSecret?: string
  authorizationCode?: string
  encoded_redirect_uri?: string
  data?: UserLoginType
}
export interface qqLoginType {
  userToken?: any
  type?: any
  code?: number
  data?: UserLoginType
}
