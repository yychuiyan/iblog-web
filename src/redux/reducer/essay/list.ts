import { ESSAY_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  essay: [],
  // hasMore:false
};
export const EssayListReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case ESSAY_LIST:
      return {
        essay: action.essay,
      };
    default:
      return state;
  }
};
