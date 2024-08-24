import useSWR from 'swr'
import { request } from '@/utils/request'
import { FriendlyTypeResponse } from './type'

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
export const useFriendlyList = () => {
  const { data, error } = useSWR(`/iblog/friendly/list`, fetcher)
  return {
    frilendlyList: data as FriendlyTypeResponse,
    isFriendlyListFetched: !error && data !== undefined
  }
}
