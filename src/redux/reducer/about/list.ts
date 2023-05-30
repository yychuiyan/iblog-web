import { ABOUT_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  about: [],
};
export const AboutListReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ABOUT_LIST:
      return {
        about: action.about,
      };
    default:
      return state;
  }
};
