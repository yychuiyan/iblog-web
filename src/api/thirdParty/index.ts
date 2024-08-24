import useSWR from 'swr'
import { request } from '@/utils/request'
import { thirdPartyType } from './type'

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
// 诗词
export const usePoemList = () => {
  const { data, error } = useSWR(`/all.json`, fetcher)
  return {
    poemDetail: data as thirdPartyType,
    isPoemListFetched: !error && data !== undefined
  }
}
// 获取天气
export const useWeather = (key, location, language, unit) => {
  const { data, error } = useSWR(
    `/v3/weather/now.json?key=${key}&&location=${location}&&language=${language}&&unit=${unit}`,
    fetcher
  )
  return {
    weatherInfo: data as thirdPartyType,
    isWeatherFetched: !error && data !== undefined // 数据是否成功获取
  }
}
