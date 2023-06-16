import { HANDLE_LIKE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  like: String,
};
export const LikeUpdateReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case HANDLE_LIKE:
      return {
        like: action.like,
      };
    default:
      return state;
  }
};
