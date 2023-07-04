import { ESSAY_LIKE_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  like: [],
};
export const EssayLikeListReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ESSAY_LIKE_LIST:
      return {
        like: action.like,
      };
    default:
      return state;
  }
};
