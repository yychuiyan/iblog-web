import { getQQLogin } from '@/api/login'
import { QQ_LOGIN_FAILURE, QQ_LOGIN_REQUEST, QQ_LOGIN_SUCCESS, SET_MODE } from '@/redux/constants'
import axios from 'axios'
import { Dispatch } from 'redux'
import RootReducer from '@/redux/reducer'
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
    dispatch({ type: QQ_LOGIN_REQUEST })
    try {
      const response = await getQQLogin(grant_type, client_id, client_secret, code, redirect_uri)
      dispatch({ type: QQ_LOGIN_SUCCESS, payload: response.data })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch({ type: QQ_LOGIN_FAILURE, payload: error.message })
      } else {
        dispatch({ type: QQ_LOGIN_FAILURE, payload: 'An unknown error occurred' })
      }
    }
  }
}
