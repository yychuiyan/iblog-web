import { USER_UPDATE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  user: Object,
};
export const UserUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case USER_UPDATE:
      return {
        user: action.user,
      };
    default:
      return state;
  }
};
