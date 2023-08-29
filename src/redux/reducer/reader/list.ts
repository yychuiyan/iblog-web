import { READER_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  reader: [],
};
export const ReaderListReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case READER_LIST:
      return {
        reader: action.reader,
      };
    default:
      return state;
  }
};
