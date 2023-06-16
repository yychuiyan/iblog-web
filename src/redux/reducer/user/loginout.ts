import { LOGINOUT } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  userinfo: {},
};
export const LoginOutReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case LOGINOUT:
      return {
        userinfo: action.userinfo,
      };
    default:
      return state;
  }
};
