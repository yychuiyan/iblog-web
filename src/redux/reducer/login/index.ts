import { QQ_LOGIN_REQUEST, QQ_LOGIN_SUCCESS, QQ_LOGIN_FAILURE } from '@/redux/constants'

interface QQLoginState {
  loading: boolean
  data: any
  error: string | null
}

const initialState: QQLoginState = {
  loading: false,
  data: null,
  error: null
}

export const qqLoginReducer = (state = initialState, action: any): QQLoginState => {
  switch (action.type) {
    case QQ_LOGIN_REQUEST:
      return { ...state, loading: true, error: null }
    case QQ_LOGIN_SUCCESS:
      return { ...state, loading: false, data: action.payload }
    case QQ_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
