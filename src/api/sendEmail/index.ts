import useSWR from 'swr'
import { request } from '@/utils/request'
import { SendEmailType } from './type'
import { useCallback } from 'react'
// 发送邮件
const fetcherEmailPost = async ([url, params]) => {
  try {
    const response = await request.post(url, params)
    return response.data // 返回实际数据，而不是整个响应对象
  } catch (error) {
    console.error('Fetch error:', error)
    throw error // 让 SWR 知道请求失败了
  }
}
// 发送邮件
export const useSendEmail = () => {
  const { data, error } = useSWR(null, fetcherEmailPost, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false // 避免错误时自动重试
  })
  const handleSendEmail = useCallback(async (params) => {
    if (!params) return
    const response = await fetcherEmailPost([`/iblog/sendmail`, params])
    return response
  }, [])
  return {
    sendEmail: data as SendEmailType,
    isSendEmailFetched: !error && data !== undefined,
    handleSendEmail
  }
}
