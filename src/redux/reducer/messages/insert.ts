import { MESSAGE_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  message: {},
};
export const MessageInsertReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case MESSAGE_LIST:
      return {
        message: action.message,
      };
    default:
      return state;
  }
};
