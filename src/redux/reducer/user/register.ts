import { USER_REGISTER } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  userinfo: {},
};
export const UserRegisterReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case USER_REGISTER:
      return {
        userinfo: action.userinfo,
      };
    default:
      return state;
  }
};
