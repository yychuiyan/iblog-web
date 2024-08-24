import useSWR from 'swr'
import { request } from '@/utils/request'
import { UserLoginType } from './type'

// 登录
const fetcherLogin = async ([url, params]) => {
  try {
    const response = await request.post(url, params)
    return response.data // 返回实际数据，而不是整个响应对象
  } catch (error) {
    console.error('Fetch error:', error)
    throw error // 让 SWR 知道请求失败了
  }
}
// 登出
const fetcherLoginOut = async (url) => {
  try {
    const response = await request.post(url)
    return response.data // 返回实际数据，而不是整个响应对象
  } catch (error) {
    console.error('Fetch error:', error)
    throw error // 让 SWR 知道请求失败了
  }
}
// 注册
const fetcherLoginRegister = async ([url, params]) => {
  try {
    const response = await request.post(url, params)
    return response.data // 返回实际数据，而不是整个响应对象
  } catch (error) {
    console.error('Fetch error:', error)
    throw error // 让 SWR 知道请求失败了
  }
}
// 账号密码登录
export const useLogin = (params) => {
  const { data, error } = useSWR(params ? [`/iblog/user/login`, params] : null, fetcherLogin, {
    revalidateOnFocus: false
  })
  return {
    loginInfoStatus: data as UserLoginType,
    isLoginInfoStatusFetched: !error && data !== undefined
  }
}
// QQ登录
export const useQQLogin = (
  grant_type: string,
  client_id: string,
  client_secret: string,
  code: string,
  redirect_uri: string
) => {
  const { data, error } = useSWR(
    grant_type
      ? `/iblog/getQQLogin?grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}`
      : null,
    fetcherLogin,
    {
      revalidateOnFocus: false
    }
  )
  return {
    qqLoginInfoStatus: data as UserLoginType,
    isQQLoginInfoStatusFetched: !error && data !== undefined
  }
}
// 退出登录
export const useLoginOut = () => {
  // 提供一个直接调用 fetcher 的方式
  const loginOut = async () => {
    try {
      const data = await fetcherLoginOut(`/iblog/user/logout`)
      return data
    } catch (error) {
      return error
    }
  }

  return { loginOut }
}
// 注册
export const useLoginRegister = (params) => {
  const { data, error } = useSWR(
    params ? [`/iblog/user/register`, params] : null,
    fetcherLoginRegister,
    {
      revalidateOnFocus: false
    }
  )
  return {
    loginRegister: data as UserLoginType,
    isLoginRegisterFetched: !error && data !== undefined
  }
}
// 修改密码
export const useLoginFindPassowrd = (params) => {
  const { data, error } = useSWR(
    params ? [`/iblog/user/update/password`, params] : null,
    fetcherLoginRegister,
    {
      revalidateOnFocus: false
    }
  )
  return {
    loginFindPassword: data as UserLoginType,
    isLogFindPasswordFetched: !error && data !== undefined
  }
}
