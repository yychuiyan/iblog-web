import { ARTICLE_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  articles: [],
};
export const ArticleListReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ARTICLE_LIST:
      return {
        articles: action.articles,
      };
    default:
      return state;
  }
};
