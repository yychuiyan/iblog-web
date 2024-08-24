export interface MessageBoradType {
  msg?: string
  res?: MessageBoradType
  children?: any
  messageTime?: string | number | any
  _id?: string
  content?: string
  commentTime?: string | number | any
  nickname?: string
  articleId?: string
  articleTitle?: string
  pid?: string
  targetReplayId?: string
  targetReplayContent?: string
  currentReplayContent?: string
  auditTime?: number
  auditStatus?: string
  avatar?: string
  email?: string
  nickName?: string
}
export interface MessageBoradTypeResponse {
  totalCount?: number
  page?: number
  pageSize?: number
  data?: {
    data: MessageBoradType[]
  }
}
