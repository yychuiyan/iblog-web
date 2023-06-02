import { AxiosRequestConfig, AxiosInstance } from 'axios';

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<ApiResponse>;
    (url: string, config?: AxiosRequestConfig): Promise<ApiResponse>;
  }
}

export interface ApiResponse<T = any> {
  error: number;
  msg: string;
  code: number;
  data: T;
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
export interface Api {
  getArticleList(
    page: number,
    pageSize: number,
    status: number,
    publishStatus: number,
    categories: string,
    tags: string[]
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
  sendMail(emial: string, subject: string, html: string): Promise<ApiResponse>;
}