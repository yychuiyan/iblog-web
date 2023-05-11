import { SEND_MAIL } from '@/redux/constants';
const userState = {
  mail: {},
};
export const SendMailReducer = (state = userState, action: any) => {
  switch (action.type) {
    case SEND_MAIL:
      return {
        mail: action.mail,
      };
    default:
      return state;
  }
};
