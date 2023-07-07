import { WEBSIT_VISIT } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  visit: Number,
};
export const WebsitVisitReducer = (state = userState, action: Action)=> {
  switch (action.type) {
    case WEBSIT_VISIT:
      return {
        visit: action.visit
      };
      default:
        return state
  }
};
