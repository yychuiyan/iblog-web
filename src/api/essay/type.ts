export interface EssayType {
  thumbUrl?: string
  articleId?: string
  userId?: string
  _id?: string
  like?: number
  updateTime?: string
  createTime?: string | number | any
  cover?: []
  essayId?: string
  content?: string
}
export interface EssayTypeResponse {
  length: number
  totalCount?: number
  page?: number
  pageSize?: number
  data?: {
    totalCount: number
    data: EssayType[]
  }
}
export interface EssayLikeType {
  [x: string]: any
  essayId?: string
  id?: string
  userId?: string
  userName?: string
  userAvatar?: string
}
export interface EssayLikeTypeResponse {
  data: EssayLikeType[]
}
