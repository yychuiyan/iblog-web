import useSWR, { mutate } from 'swr'
import { request } from '@/utils/request'
import {
  ArticleTypeResponse,
  CommentType,
  CommentTypeResponse,
  HandleLikeType,
  HandleLikeTypeResponse,
  UpdateArticleViewType
} from './type'

// 根据传入的 URL 发送 HTTP GET 请求并返回数据
const fetcher = async (url: string) => {
  try {
    const response = await request.get(url)

    return response.data // 返回实际数据，而不是整个响应对象
  } catch (error) {
    console.error('Fetch error:', error)
    throw error // 让 SWR 知道请求失败了
  }
}
// 点赞
const fetchHandleLike = async ([url, params]: [string, HandleLikeType]) => {
  try {
    const response = await request.post(url, params)

    return response.data // 返回实际数据，而不是整个响应对象
  } catch (error) {
    console.error('Fetch error:', error)
    throw error // 让 SWR 知道请求失败了
  }
}
// 更新访问量
const fetchArticleView = async ([url, params]: [string, UpdateArticleViewType]) => {
  try {
    const response = await request.put(url, params, {})

    return response.data // 返回实际数据，而不是整个响应对象
  } catch (error) {
    console.error('Fetch error:', error)
    throw error // 让 SWR 知道请求失败了
  }
}
// 新增评论
const fetcherPost = async ([url, params]) => {
  try {
    const response = await request.post(url, params)
    return response.data // 返回实际数据，而不是整个响应对象
  } catch (error) {
    console.error('Fetch error:', error)
    throw error // 让 SWR 知道请求失败了
  }
}

// 全部文章
export const useArticleAllList = (status, publishStatus) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/iblog/article/all?status=${status}&&publishStatus=${publishStatus}`,
    fetcher
  )

  return {
    articleAllList: data as ArticleTypeResponse,
    isLoading: isLoading,
    isArticleAllListFetched: !error && data !== undefined, // 数据是否成功获取
    mutate
  }
}
// 文章列表
export const useArticleList = (page, pageSize, status, publishStatus, categories, tags) => {
  const { data, error, mutate } = useSWR(
    `/iblog/article/list?page=${page}&&pageSize=${pageSize}&&status=${status}&&publishStatus=${publishStatus}&&categories=${categories}&&tags=${tags}`,
    fetcher
  )

  return {
    articleList: data as ArticleTypeResponse,
    isArticleListFetched: !error && data !== undefined, // 数据是否成功获取
    mutate
  }
}
// 文章搜索
export const useArticleSearch = (status, publishStatus, title) => {
  const { data, isLoading, error } = useSWR(
    `/iblog/article/search?status=${status}&&publishStatus=${publishStatus}&&title=${title}`,
    fetcher
  )
  return {
    articleSearch: data as ArticleTypeResponse,
    isLoading: isLoading,
    isArticleSearchFetched: !error && data !== undefined // 数据是否成功获取
  }
}
// 获取文章点赞
export const useLikeList = () => {
  const { data, error } = useSWR(`/iblog/like`, fetcher)

  return {
    likeList: data as HandleLikeTypeResponse,
    isLikeListFetched: !error && data !== undefined // 数据是否成功获取
  }
}
// 文章点赞
export const useHandleLike = (params) => {
  const { data, error } = useSWR(params ? [`/iblog/like`, params] : null, fetchHandleLike)
  const triggerFetch = () => {
    if (params) {
      mutate([`/iblog/essay/like`, params])
    }
  }
  return {
    handleLike: triggerFetch,
    handleLikeFetched: !error && data !== undefined // 数据是否成功获取
  }
}
// 更新文章访问量
export const useUpdateArtilceView = (params) => {
  const { data, error } = useSWR([`/iblog/article/views/${params.id}`, params], fetchArticleView, {
    revalidateOnFocus: true
  })
  const visitFetch = () => {
    mutate([`/iblog/article/views/${params.id}`, params])
  }
  return {
    articleView: data as HandleLikeType,
    articleViewFetched: !error && data !== undefined, // 数据是否成功获取
    visitFetch
  }
}

// 获取评论列表
export const useCommentList = (page, pageSize, articleId) => {
  const { data, error, mutate } = useSWR(
    `/iblog/article/comments?page=${page}&&pageSize=${pageSize}&&articleId=${articleId}`,
    fetcher,
    {
      revalidateOnFocus: true
    }
  )
  return {
    articleCommentList: data as CommentTypeResponse,
    isCommentListFetched: !error && data !== undefined,
    mutate
  }
}

// 新增评论
export const useAddArticleComment = (params) => {
  const { data, error } = useSWR(
    params ? [`/iblog/article/comments/insert`, params] : null,
    fetcherPost
  )
  // const commentFetch = () => {
  //   mutate(params ? [`/iblog/article/comments/insert`, params] : null)
  // }
  return {
    addArticleComment: data as CommentType,
    isAddArticleCommentFetched: !error && data !== undefined
    // commentFetch
  }
}
