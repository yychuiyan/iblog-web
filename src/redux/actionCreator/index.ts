import { SET_MODE } from '@/redux/constants'
import RootReducer from '@/redux/reducer'
export type RootState = ReturnType<typeof RootReducer>

// 背景图片
export const asyncModeAction = (mode: number) => {
  return {
    type: SET_MODE,
    payload: mode
  }
}
