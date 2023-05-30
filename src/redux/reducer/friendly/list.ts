import { FRIENDLY_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  friendly: [],
};
export const FriendlyListReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case FRIENDLY_LIST:
      return {
        friendly: action.friendly,
      };
    default:
      return state;
  }
};
