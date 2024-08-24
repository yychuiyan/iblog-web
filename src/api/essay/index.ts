import useSWR, { mutate } from 'swr'
import { request } from '@/utils/request'
import { EssayLikeType, EssayTypeResponse } from './type'
import useSWRInfinite from 'swr/infinite'
import { EssayHandleLike } from '@/types/api'
// 获取随笔列表
const fetcher = async (url: string): Promise<EssayTypeResponse> => {
  try {
    const response = await request.get(url)
    return response.data as EssayTypeResponse
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}
// 获取随笔点赞信息
const fetcherEssay = async (url: string) => {
  try {
    const response = await request.get(url)
    return response.data
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}
// 点赞
const fetchHandleLike = async ([url, params]: [string, EssayHandleLike]) => {
  try {
    const response = await request.post(url, params)

    return response.data // 返回实际数据，而不是整个响应对象
  } catch (error) {
    console.error('Fetch error:', error)
    throw error // 让 SWR 知道请求失败了
  }
}

const getKey = (
  pageIndex: number,
  previousPageData: EssayTypeResponse | null,
  pageSize: number,
  content: string
) => {
  // 如果没有更多数据，停止请求
  if (previousPageData && previousPageData.data?.data.length === 0) {
    return null
  }

  const url = `/iblog/essay/list?page=${pageIndex + 1}&pageSize=${pageSize}&content=${content}`
  return url
}
// 获取随笔列表
export const useEssayList = (pageSize: number, content: string) => {
  const { data, error, size, setSize, mutate } = useSWRInfinite<EssayTypeResponse>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, pageSize, content),
    fetcher
  )

  // 将所有分页的数据合并
  const essayList = data ? data.flatMap((page) => page.data?.data || []) : []
  const isEssayListFetched = !error && data !== undefined

  // 基于 totalCount 和已加载的数据量来判断是否还有更多数据
  const totalCount = data?.[0]?.data?.totalCount ?? 0 // 从第一页数据中获取总数
  const hasMore = essayList.length < totalCount
  return {
    essayList,
    isEssayListFetched,
    hasMore,
    loadMore: () => {
      setSize(size + 1)
    },
    mutate
  }
}

// 随笔点赞
export const useEssayHandleLike = (params) => {
  const { data, error } = useSWR(params ? [`/iblog/essay/like`, params] : null, fetchHandleLike, {
    // revalidateOnMount: false,
    revalidateOnFocus: false // 防止焦点重新验证，避免不必要的请求
  })
  const triggerFetch = () => {
    if (params) {
      mutate([`/iblog/essay/like`, params])
    }
  }
  return {
    eassyHandleLike: triggerFetch,
    isEassyHandleLikeFetched: !error && data !== undefined // 数据是否成功获取
  }
}
// 随笔点赞列表
export const useEssayLikeList = () => {
  const { data, error } = useSWR(`/iblog/essay/like`, fetcherEssay)
  return {
    eassyLikeList: data as EssayLikeType,
    isEassyLikeListFetched: !error && data !== undefined // 数据是否成功获取
  }
}
