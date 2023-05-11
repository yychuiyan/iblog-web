import { FRIENDLY_LIST } from '@/redux/constants';
const userState = {
  friendly: [],
};
export const FriendlyListReducer = (state = userState, action: any) => {
  switch (action.type) {
    case FRIENDLY_LIST:
      return {
        friendly: action.friendly,
      };
    default:
      return state;
  }
};
