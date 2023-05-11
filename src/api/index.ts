import axios from '@/utils/http';
declare module 'axios' {
  interface AxiosResponse {
    error: number;
    msg: string;
    code: number;
    // 这里追加你的参数
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}
// 接口请求
const api = {
  // 文章列表分页
  getArticleList(
    page: any,
    pageSize: any,
    status: any,
    publishStatus: any,
    categories: any,
    tags: any
  ) {
    return axios.get(
      `/iblog/article/list?page=${page}&&pageSize=${pageSize}&&status=${status}&&publishStatus=${publishStatus}&&categories=${categories}&&tags=${tags}`
    );
  },
  // 全部文章
  getArticleAllList(status: any, publishStatus: any) {
    return axios.get(`/iblog/article/all?status=${status}&&publishStatus=${publishStatus}`);
  },
  // 搜索
  getArticleSearchList(status: any, publishStatus: any, title: any) {
    return axios.get(
      `/iblog/article/search?status=${status}&&publishStatus=${publishStatus}&&title=${title}`
    );
  },
  // 更新访问量
  updateArticleViews(params: any) {
    return axios.put(`/iblog/article/views/${params.id}`, params);
  },
  // 获取评论列表
  getArticleComments(page: any, pageSize: any, articleId: any) {
    return axios.get(
      `/iblog/article/comments?page=${page}&&pageSize=${pageSize}&&articleId=${articleId}`
    );
  },
  // 新增评论
  insertArticleComment(params: any) {
    return axios.post(`/iblog/article/comments/insert`, params);
  },
  // 获取留言列表
  getMessageList(page: any, pageSize: any, auditStatus: any) {
    return axios.get(
      `/iblog/message/list?page=${page}&&pageSize=${pageSize}&&auditStatus=${auditStatus}`
    );
  },
  // 新增留言
  insertMessage(params: any) {
    return axios.post(`/iblog/message/insert`, params);
  },
  // 随笔列表
  getEssayList(page: any, pageSize: any, content: any) {
    return axios.get(`/iblog/essay/list?page=${page}&&pageSize=${pageSize}&&content=${content}`);
  },
  // 友链列表
  getFriendlyList() {
    return axios.get(`/iblog/friendly/list`);
  },
  // 关于列表
  getAboutList(checked: Boolean) {
    return axios.get(`/iblog/about/list?checked=${checked}`);
  },
  // 诗词列表
  getVerse() {
    return axios.get(`/all.json`);
  },
  // 发送邮件
  sendMail(emial: String, subject: String, html: String) {
    return axios.get(`/iblog/sendmail?email=${emial}&&subject=${subject}&&html=${html}`);
  },
};
export default api;
