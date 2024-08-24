import { SET_MODE } from '@/redux/constants'
import { ModeState } from '@/types/comm'

const initState = {
  mode: 0
}
export const ModeReducer = (state = initState, action: ModeState) => {
  switch (action.type) {
    case SET_MODE:
      return {
        ...state,
        mode: action.payload
      }
    default:
      return state
  }
}
