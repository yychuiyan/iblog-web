import { qqLoginType } from '@/api/login/type'
import { QQ_LOGIN } from '@/redux/constants'
const userState = {
  userToken: {}
}
export const QQLoginReducer = (state = userState, action: qqLoginType) => {
  switch (action.type) {
    case QQ_LOGIN:
      return {
        userToken: action.userToken
      }
    default:
      return state
  }
}
