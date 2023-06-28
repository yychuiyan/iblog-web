import api from '@/api';
import {
  USER_LOGIN,
  LOGINOUT,
  ARTICLE_LIST,
  ARTICLE_ALL_LIST,
  ARTICLE_SEARCH_LIST,
  ARTICLE_VIEWS,
  ARTICLE_COMMENT_LIST,
  ARTICLE_COMMENT_INSERT,
  MESSAGE_LIST,
  MESSAGE_INSERT,
  ESSAY_LIST,
  FRIENDLY_LIST,
  ABOUT_LIST,
  SET_MODE,
  GET_VERSE,
  SEND_MAIL,
  HANDLE_LIKE,
  QQ_LOGIN,
  LIKE_LIST,
  USER_REGISTER,
  USER_UPDATE,
  AFFICHE_LIST,
} from '@/redux/constants';
import {
  ArticleViews,
  CommentAdd,
  HandleLike,
  LoginParams,
  MessageAdd,
  SendMail,
  UserRegister,
  UserUpdate,
} from '@/types/api';
import { message } from 'antd';
import jwtDecode from 'jwt-decode';
import { Dispatch } from 'redux';
// 登录
export function asyncLoginAction(data: LoginParams) {
  return async (dispatch: Dispatch) => {
    const res = await api.Login(data);
    if (res.code === 110404) {
      message.error(res.msg);
    } else if (res.code === 110405) {
      message.error(res.msg);
    }
    if (res.code === 0) {
      message.success('恭喜你，登录成功~');
      // 将token存储存到本地
      localStorage.setItem('yychuiyan', res.data.token);
      // 解析token
      let userToken = jwtDecode(res.data.token);
      dispatch({
        type: USER_LOGIN,
        userToken: userToken,
      });
      return res;
    } else if (res.code === 110401) {
      message.error('请检查用户名或密码后重新登录');
    }
  };
}
// 注册
export const asyncUserRegisterAction = (parmas: UserRegister) => {
  return async (dispatch: Dispatch) => {
    const res = await api.userRegister(parmas);
    dispatch({
      type: USER_REGISTER,
      userinfo: {},
    });
    return res;
  };
};
// 修改用户密码
export const asyncUserUpdateAction = (params: UserUpdate) => {
  return async (dispatch: Dispatch) => {
    const res = await api.userUpdate(params);
    dispatch({
      type: USER_UPDATE,
      user: res,
    });
    return res;
  };
};
// QQ登录
export function asyncQQLoginAction(
  grant_type: string,
  client_id: string,
  client_secret: string,
  code: string,
  redirect_uri: string
) {
  return async (dispatch: Dispatch) => {
    const res = await api.getQQLogin(grant_type, client_id, client_secret, code, redirect_uri);
    console.log('res', res);
    if (res.code === 0) {
      message.success('恭喜你，登录成功~');
      // 将token存储存到本地
      localStorage.setItem('yychuiyan', res.data.token);
      localStorage.setItem('zhj', 'success');
      // 解析token
      let userToken = jwtDecode(res.data.token);
      dispatch({
        type: QQ_LOGIN,
        userToken: userToken,
      });
      return res;
    }
  };
}
// 登出
export const asyncLoginOutAction = () => {
  return async (dispatch: Dispatch) => {
    const res = await api.loginOut();
    dispatch({
      type: LOGINOUT,
      userinfo: res,
    });
  };
};
// 点赞
export const asyncLikeCreateAction = (params: HandleLike) => {
  return async (dispatch: Dispatch) => {
    const res = await api.isHandleLike(params);
    if (res.code === 100201) {
      message.warning('已经点过了哟~😆');
      return false;
    }
    dispatch({
      type: HANDLE_LIKE,
      like: res,
    });
    return res;
  };
};
// 点赞列表
export const asyncLikeListAction = () => {
  return async (dispatch: Dispatch) => {
    const res = await api.getLikeList();
    dispatch({
      type: LIKE_LIST,
      like: res,
    });
    return res;
  };
};
// 文章列表
export const asyncArticleListAction = (
  page: number,
  pageSize: number,
  status: number,
  publishStatus: number,
  categories: string,
  tags: string[]
) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getArticleList(page, pageSize, status, publishStatus, categories, tags);
    dispatch({
      type: ARTICLE_LIST,
      articles: res,
    });
    return res;
  };
};
// 不含分页文章列表
export const asyncArticleAllListAction = (status: number, publishStatus: number) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getArticleAllList(status, publishStatus);
    dispatch({
      type: ARTICLE_ALL_LIST,
      articles: res,
    });
    return res;
  };
};
// 搜索的结果
export const asyncArticleSearchListAction = (
  status: number,
  publishStatus: number,
  title: string
) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getArticleSearchList(status, publishStatus, title);
    dispatch({
      type: ARTICLE_SEARCH_LIST,
      articles: res,
    });
    return res;
  };
};
// 更新访问数量
export const asyncArticleViewsAction = (params: ArticleViews) => {
  return async (dispatch: Dispatch) => {
    const res = await api.updateArticleViews(params);
    dispatch({
      type: ARTICLE_VIEWS,
      views: res,
    });
    return res;
  };
};
// 获取评论列表
export const asyncArticleCommentsAction = (page: number, pageSize: number, articleId: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getArticleComments(page, pageSize, articleId);
    dispatch({
      type: ARTICLE_COMMENT_LIST,
      comments: res,
    });
    return res;
  };
};
// 新增评论
export const asyncArticleCommentInsertAction = (data: CommentAdd) => {
  return async (dispatch: Dispatch) => {
    const res = await api.insertArticleComment(data);
    dispatch({
      type: ARTICLE_COMMENT_INSERT,
      comments: {},
    });
    return res;
  };
};
// 获取留言列表
export const asyncMessageListAction = (page: number, pageSize: number, auditStatus: number) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getMessageList(page, pageSize, auditStatus);
    dispatch({
      type: MESSAGE_LIST,
      messages: res,
    });
    return res;
  };
};
// 新增留言
export const asyncMessageInsertAction = (data: MessageAdd) => {
  return async (dispatch: Dispatch) => {
    const res = await api.insertMessage(data);
    dispatch({
      type: MESSAGE_INSERT,
      message: {},
    });
    return res;
  };
};

// 随笔列表
export const asyncEssayListAction = (page: number, pageSize: number, content: string) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getEssayList(page, pageSize, content);
    dispatch({
      type: ESSAY_LIST,
      essay: res,
    });
    return res;
  };
};
// 友链列表
export const asyncFriendlyListAction = () => {
  return async (dispatch: Dispatch) => {
    const res = await api.getFriendlyList();
    dispatch({
      type: FRIENDLY_LIST,
      friendly: res,
    });
    return res;
  };
};
// 关于管理
export const asyncAboutListAction = (checked: boolean) => {
  return async (dispatch: Dispatch) => {
    const res = await api.getAboutList(checked);
    dispatch({
      type: ABOUT_LIST,
      about: res,
    });
    return res;
  };
};
// 背景图片
export const asyncModeAction = (mode: number) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_MODE,
      mode,
    });
    return mode;
  };
};
// 诗词
export const asyncVerseAction = () => {
  return async (dispatch: Dispatch) => {
    const res = await api.getVerse();
    dispatch({
      type: GET_VERSE,
      verse: res,
    });
    return res;
  };
};
// 邮件提醒
export const asyncSendMailAction = (parmas: SendMail) => {
  return async (dispatch: Dispatch) => {
    const res = await api.sendMail(parmas);
    dispatch({
      type: SEND_MAIL,
      mail: res,
    });
    return res;
  };
};
// 公告列表
export const asyncAfficheListAction = () => {
  return async (dispatch: Dispatch) => {
    const res = await api.getAfficheList();
    dispatch({
      type: AFFICHE_LIST,
      affiche: res,
    });
    return res;
  };
};
