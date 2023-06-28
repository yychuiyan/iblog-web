import { AFFICHE_LIST } from '@/redux/constants';
import { Action } from '@/types/comm';
const userState = {
  affiche: [],
};
export const AfficheListReducer = (state = userState, action: Action) => {
  switch (action.type) {
    case AFFICHE_LIST:
      return {
        affiche: action.affiche,
      };
    default:
      return state;
  }
};
