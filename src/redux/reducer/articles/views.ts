import { ARTICLE_VIEWS } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  views: '',
};
export const ArticleViewsActionReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ARTICLE_VIEWS:
      return {
        views: action.views,
      };
    default:
      return state;
  }
};
