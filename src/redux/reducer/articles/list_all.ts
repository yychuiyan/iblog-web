import { ARTICLE_ALL_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  articles: [],
};
export const ArticleAllListReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ARTICLE_ALL_LIST:
      return {
        articles: action.articles,
      };
    default:
      return state;
  }
};
