import { SET_MODE } from '@/redux/constants';
const userState = {
  mode: 0,
};
export const ModeReducer = (state = userState, action: any) => {
  switch (action.type) {
    case SET_MODE:
      return {
        mode: action.mode,
      };
    default:
      return state;
  }
};
