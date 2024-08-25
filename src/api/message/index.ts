import useSWR from 'swr'
import { request } from '@/utils/request'
import { MessageBoradType, MessageBoradTypeResponse } from './type'
import { useCallback } from 'react'

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
// 新增留言
const fetcherPost = async ([url, params]) => {
  try {
    const response = await request.post(url, params)
    return response.data // 返回实际数据，而不是整个响应对象
  } catch (error) {
    console.error('Fetch error:', error)
    throw error // 让 SWR 知道请求失败了
  }
}
// 获取留言列表
export const useMessageBoradList = (page, pageSize, auditStatus) => {
  const { data, error, mutate } = useSWR(
    `/iblog/message/list?page=${page}&&pageSize=${pageSize}&&auditStatus=${auditStatus}`,
    fetcher,
    {
      revalidateOnFocus: false
    }
  )
  return {
    messageBoardList: data as MessageBoradTypeResponse,
    isMessageBoradListFetched: !error && data !== undefined,
    mutate
  }
}

// 新增留言
export const useAddMessageBorad = () => {
  const { data, error } = useSWR(null, fetcherPost, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false // 避免错误时自动重试
  })

  const handleMessageBoard = useCallback(async (params) => {
    if (!params) return
    const response = await fetcherPost(['/iblog/message/insert', params])
    return response
  }, [])

  return {
    handleMessageBoard,
    addMessageBoard: data as MessageBoradType,
    isAddMessageBoradFetched: !error && data !== undefined
  }
}
