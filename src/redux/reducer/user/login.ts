import { USER_LOGIN } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  userToken: {},
};
export const UserLoginReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        userToken: action.userToken,
      };
    default:
      return state;
  }
};
