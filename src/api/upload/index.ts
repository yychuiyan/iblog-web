import useSWR, { mutate } from 'swr'
import { request } from '@/utils/request'
import { UploadType } from './type'

// 根据传入的 URL 发送 HTTP GET 请求并返回数据
const fetcher = async ([url, params]) => {
  try {
    const response = await request.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data // 返回实际数据，而不是整个响应对象
  } catch (error) {
    console.error('Fetch error:', error)
    throw error // 让 SWR 知道请求失败了
  }
}
export const useUploadImage = (params) => {
  const { data, error } = useSWR(params ? [`/iblog/upload/avatar`, params] : null, fetcher)
  const uploadFetch = () => {
    if (params) {
      mutate([`/iblog/upload/avatar`, params])
    }
  }
  return {
    uploadImage: data as UploadType,
    isUploadImageFetched: !error && data !== undefined,
    uploadFetch
  }
}
