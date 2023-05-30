import { SET_MODE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  mode: 0,
};
export const ModeReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case SET_MODE:
      return {
        mode: action.mode,
      };
    default:
      return state;
  }
};
