import { ESSAY_LIST } from '@/redux/constants';
const userState = {
  essay: [],
  // hasMore:false
};
export const EssayListReducer = (state = userState, action: any) => {
  switch (action.type) {
    case ESSAY_LIST:
      return {
        essay: action.essay,
      };
    default:
      return state;
  }
};
