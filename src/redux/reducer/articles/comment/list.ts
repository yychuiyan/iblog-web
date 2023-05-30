import { ARTICLE_COMMENT_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  comments: [],
};
export const ArticleCommentsReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ARTICLE_COMMENT_LIST:
      return {
        comments: action.comments,
      };
    default:
      return state;
  }
};
