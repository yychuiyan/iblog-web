import { GET_VERSE } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  verse: {},
};
export const VerseReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case GET_VERSE:
      return {
        verse: action.verse,
      };
    default:
      return state;
  }
};
