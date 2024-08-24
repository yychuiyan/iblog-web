import useSWR from 'swr'
import { request } from '@/utils/request'
import { WebSiteType } from './type'

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
// 根据传入的 URL 发送 HTTP GET 请求并返回数据
const fetcherPost = async (url) => {
  try {
    const response = await request.post(url)

    return response.data // 返回实际数据，而不是整个响应对象
  } catch (error) {
    console.error('Fetch error:', error)
    throw error // 让 SWR 知道请求失败了
  }
}
// 更新网站访问量
export const useWebSiteUpdate = () => {
  const { data, error } = useSWR(`/iblog/websit/visit`, fetcherPost, {
    // 阻止初始渲染时的自动请求
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 0 // 避免短时间内的重复请求
  })
  return {
    webSiteUpdate: data as WebSiteType,
    isWebSiteUpdateFetched: !error && data !== undefined // 数据是否成功获取
  }
}
// 获取访问量
export const useWebSiteView = () => {
  const { data, error } = useSWR(`/iblog/websit/visit`, fetcher)
  return {
    webSiteView: data as WebSiteType,
    isWebSiteViewFetched: !error && data !== undefined // 数据是否成功获取
  }
}
