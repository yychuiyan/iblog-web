import { ARTICLE_COMMENT_INSERT } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  comments: [],
};
export const ArticleCommentInsertReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ARTICLE_COMMENT_INSERT:
      return {
        comments: action.comments,
      };
    default:
      return state;
  }
};
