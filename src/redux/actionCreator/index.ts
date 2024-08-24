import { SET_MODE } from '@/redux/constants'
// 背景图片
export const asyncModeAction = (mode: number) => {
  return {
    type: SET_MODE,
    payload: mode
  }
}
