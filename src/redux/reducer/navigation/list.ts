import { NAVIGATION_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  nav: [],
};
export const NavigationListReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case NAVIGATION_LIST:
      return {
        nav: action.nav,
      };
    default:
      return state;
  }
};
