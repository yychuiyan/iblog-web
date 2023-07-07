import { WEBSIT_VISIT_NUMBER } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  visit: Number,
};
export const WebsitVisitNumberReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case WEBSIT_VISIT_NUMBER:
      return {
        visit: action.visit,
      };
    default:
      return state;
  }
};
