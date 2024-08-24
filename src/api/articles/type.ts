export interface ArticleType {
  id?: string
  updateTime?: number
  content?: string
  status?: number
  publishStatus?: number
  articleId?: string
  userId?: string
  like?: number
  comment?: string
  createTime?: number
  isTop?: number
  introduction?: string
  title?: string
  cover?: string
  _id?: string
  categories?: string
  tags?: []
  views?: number
  page?: number
  pageSize: number
}
export interface ArticleTypeResponse {
  totalCount?: number
  page?: number
  pageSize?: number
  name?: string
  data?: {
    data: ArticleType[]
  }
}
export interface HandleLikeType {
  id?: string
  articleId?: string
  articleName?: string
  userId?: string
  userName?: string
  userAvatar?: string
}
export interface HandleLikeTypeResponse {
  data: HandleLikeType[]
}
export interface UpdateArticleViewType {
  views: number
  id: string
}
export interface CommentType {
  msg?: string
  res?: CommentType
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
export interface CommentTypeResponse {
  totalCount?: number
  page?: number
  pageSize?: number
  data?: {
    data: CommentType[]
  }
}
// export interface MessageBoradReplyType {
//   email?: string
//   _id?: string
//   pid?: string
//   nickName?: string
//   currentReplayContent?: string
// }
export interface SendEmailCommentType {
  email?: string
  subject?: string
  html?: string
}
