import { QQ_LOGIN } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  userToken: {},
};
export const QQLoginReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case QQ_LOGIN:
      return {
        userToken: action.userToken,
      };
    default:
      return state;
  }
};
