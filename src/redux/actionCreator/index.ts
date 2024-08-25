import { getQQLogin } from '@/api/login'
import { QQ_LOGIN, SET_MODE } from '@/redux/constants'
import { Dispatch } from 'redux'
import RootReducer from '@/redux/reducer'
import jwtDecode from 'jwt-decode'
import { message } from 'antd'
import { qqLoginType } from '@/api/login/type'
export type RootState = ReturnType<typeof RootReducer>

// 背景图片
export const asyncModeAction = (mode: number) => {
  return {
    type: SET_MODE,
    payload: mode
  }
}
// QQ登录
export const qqLogin = (
  grant_type: string,
  client_id: string,
  client_secret: string,
  code: string,
  redirect_uri: string
): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response: qqLoginType = await getQQLogin(
        grant_type,
        client_id,
        client_secret,
        code,
        redirect_uri
      )
      if (response.code === 0) {
        message.success('恭喜你，登录成功~')
        // 将token存储存到本地
        localStorage.setItem('yychuiyan', response.data.token)
        localStorage.setItem('zhj', 'success')
        // 解析token
        const userToken = jwtDecode(response.data.token)
        dispatch({
          type: QQ_LOGIN,
          userToken: userToken
        })
        return response
      }
    } catch (error) {
      message.error('登录异常！', error as any)
    }
  }
}
