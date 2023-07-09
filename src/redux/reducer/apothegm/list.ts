import { APOTHEGM_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  apothegm: [],
};
export const ApothegmListReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case APOTHEGM_LIST:
      return {
        apothegm: action.apothegm,
      };
    default:
      return state;
  }
};
