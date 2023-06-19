import axios from '@/utils/http';
import {
  Api,
  ArticleViews,
  CommentAdd,
  HandleLike,
  MessageAdd,
  QQLogin,
  SendMail,
} from '@/types/api';
// 接口请求
const api: Api = {
  // 登录
  Login(params) {
    return axios.post(`/iblog/user/login`, params);
  },
  // QQ登录
  getQQLogin(
    grant_type: string,
    client_id: string,
    client_secret: string,
    code: string,
    redirect_uri: string
  ) {
    return axios.get(
      `/iblog/getQQLogin?grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}`
    );
  },
  // 退出登录
  loginOut() {
    return axios.post(`/iblog/user/logout`);
  },
  // 点赞
  isHandleLike(params: HandleLike) {
    return axios.post(`/iblog/like`, params);
  },
  // 点赞列表
  getLikeList() {
    return axios.get(`/iblog/like`)
  },
  // 文章列表分页
  getArticleList(
    page: number,
    pageSize: number,
    status: number,
    publishStatus: number,
    categories: string,
    tags: string[]
  ) {
    return axios.get(
      `/iblog/article/list?page=${page}&&pageSize=${pageSize}&&status=${status}&&publishStatus=${publishStatus}&&categories=${categories}&&tags=${tags}`
    );
  },
  // 全部文章
  getArticleAllList(status: number, publishStatus: number) {
    return axios.get(`/iblog/article/all?status=${status}&&publishStatus=${publishStatus}`);
  },
  // 搜索
  getArticleSearchList(status: number, publishStatus: number, title: string) {
    return axios.get(
      `/iblog/article/search?status=${status}&&publishStatus=${publishStatus}&&title=${title}`
    );
  },
  // 更新访问量
  updateArticleViews(params: ArticleViews) {
    return axios.put(`/iblog/article/views/${params.id}`, params);
  },
  // 获取评论列表
  getArticleComments(page: number, pageSize: number, articleId: string) {
    return axios.get(
      `/iblog/article/comments?page=${page}&&pageSize=${pageSize}&&articleId=${articleId}`
    );
  },
  // 新增评论
  insertArticleComment(params: CommentAdd) {
    return axios.post(`/iblog/article/comments/insert`, params);
  },
  // 获取留言列表
  getMessageList(page: number, pageSize: number, auditStatus: number) {
    return axios.get(
      `/iblog/message/list?page=${page}&&pageSize=${pageSize}&&auditStatus=${auditStatus}`
    );
  },
  // 新增留言
  insertMessage(params: MessageAdd) {
    return axios.post(`/iblog/message/insert`, params);
  },
  // 随笔列表
  getEssayList(page: number, pageSize: number, content: string) {
    return axios.get(`/iblog/essay/list?page=${page}&&pageSize=${pageSize}&&content=${content}`);
  },
  // 友链列表
  getFriendlyList() {
    return axios.get(`/iblog/friendly/list`);
  },
  // 关于列表
  getAboutList(checked: boolean) {
    return axios.get(`/iblog/about/list?checked=${checked}`);
  },
  // 诗词列表
  getVerse() {
    return axios.get(`/all.json`);
  },
  // 发送邮件
  sendMail(params: SendMail) {
    return axios.post(`/iblog/sendmail`, params);
  },
};
export default api;
