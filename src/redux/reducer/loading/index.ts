import { CHANGE_LOADING } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  isLoading: false,
};
export const LoadingReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case CHANGE_LOADING:
      return {
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};
