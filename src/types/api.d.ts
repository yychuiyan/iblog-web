import { AxiosRequestConfig, AxiosInstance } from 'axios';

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<ApiResponse>;
    (url: string, config?: AxiosRequestConfig): Promise<ApiResponse>;
  }
}

export interface ApiResponse<T = any> {
  token(token: any): unknown;
  error: number;
  msg: string;
  code: number;
  data: T;
}
// 登录
interface LoginParams {
  username: string;
  password: string;
}
// 注册
interface UserRegister {
  username: string;
  password: string;
  email: string;
  avatar: string;
}
// 修改用户密码
interface UserUpdate{
  username: string,
  password: string
}
interface ArticleViews {
  views: number;
  id: string;
}
interface CommentAdd {
  _id: string;
  content: string;
  children: any;
  commentTime: string | number | any;
  pid: string;
  targetReplayId: string;
  targetReplayContent: string;
  currentReplayContent: string;
  avatar: string;
  email: string;
  nickname: string;
  articleId: string;
  articleTitle: string;
}
interface MessageAdd {
  pid: string;
  targetReplayId: string;
  targetReplayContent: string;
  currentReplayContent: string;
  auditTime: string;
  auditStatus: string;
  avatar: string;
  email: string;
  nickName: string;
}
interface SendMail {
  email: string;
  subject: string;
  html: string;
}
interface HandleLike {
  id: string;
  articleId: string;
  articleName: string;
  userId: string;
  userName: string;
  userAvatar: string;
}
interface EssayHandleLike {
  id: string;
  essayId: string;
  userId: string;
  userName: string;
  userAvatar: string;
}
interface QQLogin {
  grant_type: string;
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri: string;
}

export interface Api {
  getArticleList(
    page: number,
    pageSize: number,
    status: number,
    publishStatus: number,
    categories: string,
    tags: string[]
  ): Promise<ApiResponse>;
  Login(params: LoginParams): Promise<ApiResponse>;
  userRegister(params: UserRegister): Promise<ApiResponse>;
  userUpdate(params: UserUpdate): Promise<ApiResponse>;
  loginOut(): Promise<ApiResponse>;
  isHandleLike(params: HandleLike): Promise<ApiResponse>;
  getLikeList(): Promise<ApiResponse>;
  getQQLogin(
    grant_type: string,
    client_id: string,
    client_secret: string,
    code: string,
    redirect_uri: string
  ): Promise<ApiResponse>;
  getArticleAllList(status: number, publishStatus: number): Promise<ApiResponse>;
  getArticleSearchList(status: number, publishStatus: number, title: string): Promise<ApiResponse>;
  updateArticleViews(params: ArticleViews): Promise<ApiResponse>;
  getArticleComments(page: number, pageSize: number, articleId: string): Promise<ApiResponse>;
  insertArticleComment(params: CommentAdd): Promise<ApiResponse>;
  getMessageList(page: number, pageSize: number, auditStatus: number): Promise<ApiResponse>;
  insertMessage(params: MessageAdd): Promise<ApiResponse>;
  getEssayList(page: number, pageSize: number, content: string): Promise<ApiResponse>;
  getFriendlyList(): Promise<ApiResponse>;
  getAboutList(checked: boolean): Promise<ApiResponse>;
  getVerse(): Promise<ApiResponse>;
  getWeather(key: string, location: string, language: string, unit: string): Promise<ApiResponse>;
  sendMail(params: SendMail): Promise<ApiResponse>;
  getAfficheList(): Promise<ApiResponse>;
  essayHandleLike(params: EssayHandleLike): Promise<ApiResponse>;
  getEassayLike(): Promise<ApiResponse>;
  getVisit(visitNumber: number): Promise<ApiResponse>;
  getVisitNumber(): Promise<ApiResponse>;
  getApothegmList(): Promise<ApiResponse>;
  getReaderList(): Promise<ApiResponse>;
  getNavigationList(): Promise<ApiResponse>;
}
