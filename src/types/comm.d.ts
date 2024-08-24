export interface TokenType {
  avatar?: string
  _id?: string
  userId?: string
  userName?: string
  username?: string
  userAvatar?: string
}
export interface LoginInfoType {
  avatar?: string
}
export interface ModeState {
  ModeReducer: any
  payload?: number
  mode?: number
  type?: string
}
export interface CategoryData {
  views: any
  id: Key | null | undefined
  tags: any
  history: any
  data: any
  title: ReactNode
  count: number
  name: string
  categories: string
  _id: string
}
