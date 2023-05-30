import { MESSAGE_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  messages: [],
};
export const MessageListReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case MESSAGE_LIST:
      return {
        messages: action.messages,
      };
    default:
      return state;
  }
};
