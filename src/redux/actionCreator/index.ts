import api from '@/api';
import {
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
} from '@/redux/constants';
import { useState } from 'react';
// 文章列表
export const asyncArticleListAction = (
  page: Number,
  pageSize: Number,
  status: Number,
  publishStatus: Number,
  categories: String,
  tags: String
) => {
  return async (dispatch: any) => {
    const res = await api.getArticleList(page, pageSize, status, publishStatus, categories, tags);
    dispatch({
      type: ARTICLE_LIST,
      articles: res,
    });
    return res;
  };
};
// 不含分页文章列表
export const asyncArticleAllListAction = (status: Number, publishStatus: Number) => {
  return async (dispatch: any) => {
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
  status: Number,
  publishStatus: Number,
  title: String
) => {
  return async (dispatch: any) => {
    const res = await api.getArticleSearchList(status, publishStatus, title);
    dispatch({
      type: ARTICLE_SEARCH_LIST,
      articles: res,
    });
    return res;
  };
};
// 更新访问数量
export const asyncArticleViewsAction = (params: any) => {
  return async (dispatch: any) => {
    const res = await api.updateArticleViews(params);
    dispatch({
      type: ARTICLE_VIEWS,
      views: res,
    });
    return res;
  };
};
// 获取评论列表
export const asyncArticleCommentsAction = (page: Number, pageSize: Number, articleId: any) => {
  return async (dispatch: any) => {
    const res = await api.getArticleComments(page, pageSize, articleId);
    dispatch({
      type: ARTICLE_COMMENT_LIST,
      comments: res,
    });
    return res;
  };
};
// 新增评论
export const asyncArticleCommentInsertAction = (data: any) => {
  return async (dispatch: any) => {
    const res = await api.insertArticleComment(data);
    dispatch({
      type: ARTICLE_COMMENT_INSERT,
      comments: {},
    });
    return res;
  };
};
// 获取留言列表
export const asyncMessageListAction = (page: Number, pageSize: Number, auditStatus: any) => {
  return async (dispatch: any) => {
    const res = await api.getMessageList(page, pageSize, auditStatus);
    dispatch({
      type: MESSAGE_LIST,
      messages: res,
    });
    return res;
  };
};
// 新增留言
export const asyncMessageInsertAction = (data: any) => {
  return async (dispatch: any) => {
    const res = await api.insertMessage(data);
    dispatch({
      type: MESSAGE_INSERT,
      message: {},
    });
    return res;
  };
};

// 随笔列表
export const asyncEssayListAction = (page: Number, pageSize: Number, content: any) => {
  return async (dispatch: any) => {
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
  return async (dispatch: any) => {
    const res = await api.getFriendlyList();
    dispatch({
      type: FRIENDLY_LIST,
      friendly: res,
    });
    return res;
  };
};
// 关于管理
export const asyncAboutListAction = (checked: Boolean) => {
  return async (dispatch: any) => {
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
  return (dispatch: any) => {
    dispatch({
      type: SET_MODE,
      mode,
    });
    return mode;
  };
};
// 诗词
export const asyncVerseAction = () => {
  return async (dispatch: any) => {
    const res = await api.getVerse();
    dispatch({
      type: GET_VERSE,
      verse: res,
    });
    return res;
  };
};
// 邮件提醒
export const asyncSendMailAction = (emial: String, subject: String, html: String) => {
  return async (dispatch: any) => {
    const res = await api.sendMail(emial, subject, html);
    dispatch({
      type: SEND_MAIL,
      mail: res,
    });
    return res;
  };
};
