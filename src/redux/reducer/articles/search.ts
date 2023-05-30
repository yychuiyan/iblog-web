import { ARTICLE_SEARCH_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  articles: [],
};
export const ArticleSearchListReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ARTICLE_SEARCH_LIST:
      return {
        articles: action.articles,
      };
    default:
      return state;
  }
};
