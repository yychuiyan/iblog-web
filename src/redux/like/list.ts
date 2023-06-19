import { LIKE_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  like: [],
};
export const LikeListReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case LIKE_LIST:
      return {
        like: action.like,
      };
    default:
      return state;
  }
};
