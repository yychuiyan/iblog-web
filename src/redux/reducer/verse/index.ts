import { GET_VERSE } from '@/redux/constants';
const userState = {
  verse: {},
};
export const VerseReducer = (state = userState, action: any) => {
  switch (action.type) {
    case GET_VERSE:
      return {
        verse: action.verse,
      };
    default:
      return state;
  }
};
