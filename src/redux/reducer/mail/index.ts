import { SEND_MAIL } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  mail: String,
};
export const SendMailReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case SEND_MAIL:
      return {
        mail: action.mail,
      };
    default:
      return state;
  }
};
