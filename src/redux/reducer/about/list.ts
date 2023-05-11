import { ABOUT_LIST } from '@/redux/constants';
const userState = {
  about: [],
};
export const AboutListReducer = (state = userState, action: any) => {
  switch (action.type) {
    case ABOUT_LIST:
      return {
        about: action.about,
      };
    default:
      return state;
  }
};
